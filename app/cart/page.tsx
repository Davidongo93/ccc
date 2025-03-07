'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import Link from "next/link"
import { useRouter } from 'next/navigation';
import { ShoppingBag, Trash2, Plus, Minus } from "lucide-react"
import Navbar from "../../components/landing/navbar"
import Footer from 'components/landing/footer';
import { API_ROUTES } from "../../config/api.config";
import { useShopifyOrder } from "../../hooks/useShopifyOrder";
import { useAuth } from "../../hooks/useAuth";

interface StoredCartItem {
  variantId: string;
  quantity: number;
  title: string;
  price: number;
  image: string;
  addedAt: string;
  productData?: {
    id: string;
    title: string;
    description?: string;
    variants: Array<{
      id: string;
      title: string;
      price: {
        amount: string;
        currencyCode: string;
      };
      selectedOptions?: Array<{
        name: string;
        value: string;
      }>;
    }>;
  };
}

interface StockInfo {
  id: string;
  quantityAvailable: number;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
}

export default function CartPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { getPaymentUrl } = useShopifyOrder();
  const [cartItems, setCartItems] = useState<(StoredCartItem & { quantityAvailable?: number })[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const envio = 5.99;

  const fetchStockInfo = useCallback(async (items: StoredCartItem[]) => {
    try {
      const variantIds = items.map(item => item.variantId);
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No se encontró el token de autenticación');
      }
      
      console.log('Verificando stock para:', variantIds);
      
      const response = await fetch(API_ROUTES.PRODUCTS.STOCK, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ variantIds })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error response:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        });
        throw new Error(errorData.message || `Error al obtener información de stock: ${response.status} ${response.statusText}`);
      }

      const stockData: StockInfo[] = await response.json();
      
      if (!Array.isArray(stockData)) {
        console.error('Formato de respuesta inválido:', stockData);
        throw new Error('Formato de respuesta inválido');
      }
      
      console.log('Stock data recibida:', stockData);
      
      // Actualizar los items con la información de stock
      const updatedItems = items.map(item => {
        const variantStock = stockData.find(stock => stock.id === item.variantId);
        if (!variantStock) {
          console.warn(`No se encontró información de stock para la variante ${item.variantId}`);
        }
        return {
          ...item,
          quantityAvailable: variantStock?.quantityAvailable || 0
        };
      });

      // Ajustar cantidades si exceden el stock disponible
      const adjustedItems = updatedItems.map(item => {
        if (item.quantity > (item.quantityAvailable || 0)) {
          toast.error(`Stock insuficiente para ${item.title}. Se ajustó la cantidad al máximo disponible (${item.quantityAvailable}).`);
          return {
            ...item,
            quantity: item.quantityAvailable || 0
          };
        }
        return item;
      });

      setCartItems(adjustedItems);
      localStorage.setItem('cart', JSON.stringify(adjustedItems));
      
      const total = adjustedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      setSubtotal(total);
    } catch (error) {
      console.error('Error al verificar stock:', error);
      toast.error('Error al verificar el stock disponible');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = JSON.parse(localStorage.getItem('cart') || '[]') as StoredCartItem[];
        if (storedCart.length > 0) {
          await fetchStockInfo(storedCart);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error al cargar el carrito:', error);
        toast.error('Error al cargar el carrito');
        setIsLoading(false);
      }
    };

    loadCart();

    // Configurar actualización periódica cada 30 segundos
    const intervalId = setInterval(() => {
      const storedCart = JSON.parse(localStorage.getItem('cart') || '[]') as StoredCartItem[];
      if (storedCart.length > 0) {
        fetchStockInfo(storedCart);
      }
    }, 30000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, [fetchStockInfo]);

  const updateQuantity = async (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const item = cartItems[index];
    if (newQuantity > (item.quantityAvailable || 0)) {
      toast.error(`Solo hay ${item.quantityAvailable} unidades disponibles de ${item.title}`);
      return;
    }

    const updatedItems = [...cartItems];
    updatedItems[index] = {
      ...updatedItems[index],
      quantity: newQuantity
    };
    
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    
    const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setSubtotal(total);
  };

  const removeItem = (index: number) => {
    const updatedItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    
    const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setSubtotal(total);
    
    toast.success('Producto eliminado del carrito');
  };

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Debes iniciar sesión para realizar el pedido');
      router.push('/login');
      return;
    }

    setIsProcessingOrder(true);
    try {
      const orderData = {
        customerId: user.shopifyCustomerId,
        userId: user.id,
        lineItems: cartItems.map(item => ({
          variantId: item.variantId,
          quantity: item.quantity
        }))
      };

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No se encontró el token de autenticación');
      }

      // Crear el checkout directamente
      const response = await fetch(`${API_ROUTES.ORDERS.BASE}/create-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error al crear el checkout');
      }

      const { checkoutUrl } = await response.json();

      // Limpiar el carrito local
      localStorage.setItem('cart', '[]');
      setCartItems([]);
      setSubtotal(0);

      // Redirigir al checkout de Shopify
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Error al procesar el pedido:', error);
      toast.error(error instanceof Error ? error.message : 'Error al procesar el pedido');
    } finally {
      setIsProcessingOrder(false);
    }
  };

  if (isLoading) {
    return (
      <main className="bg-gray-50 text-gray-900">
        <Navbar />
        <section className="relative py-40 p-4">
          <div className="text-center">
            <p>Cargando carrito...</p>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="bg-gray-50 text-gray-900">
      <Navbar />
      <section
        className="relative py-40 p-4"
        style={{
          backgroundImage: "url('/images/web-fondo-blanco.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <h1 className="text-3xl font-bold mb-8 ml-6 text-grey-600">Carrito de Compras</h1>
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Tu carrito está vacío</h2>
            <p className="text-gray-600 mb-4">Parece que aún no has añadido nada a tu carrito.</p>
            <Link
              href="/products"
              className="inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Continuar Comprando
            </Link>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Lista de productos */}
            <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
              {cartItems.map((item, index) => (
                    <div key={`${item.variantId}-${index}`} className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative w-20 h-20">
                    <Image
                            src={item.image || '/images/placeholder.png'}
                      alt={item.title}
                      fill
                            style={{ objectFit: 'cover' }}
                            className="rounded-md"
                    />
                  </div>
                        <div>
                          <h3 className="font-semibold">{item.title}</h3>
                          <p className="text-gray-600 text-sm">Precio: ${item.price}</p>
                          {item.quantityAvailable !== undefined && (
                            item.quantityAvailable === 0 ? (
                              <p className="text-red-500 text-sm">Agotado</p>
                            ) : item.quantityAvailable < 5 ? (
                              <p className="text-orange-500 text-sm">
                                ¡Solo quedan {item.quantityAvailable} unidades!
                              </p>
                            ) : (
                              <p className="text-green-500 text-sm">En stock</p>
                            )
                          )}
                  </div>
                      </div>
                      <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => updateQuantity(index, item.quantity - 1)}
                      className="p-1 rounded-full hover:bg-gray-100"
                      aria-label="Disminuir cantidad"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(index, item.quantity + 1)}
                      className="p-1 rounded-full hover:bg-gray-100"
                      aria-label="Aumentar cantidad"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="text-red-500 hover:text-red-700"
                    aria-label="Eliminar producto"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                      </div>
                    </div>
                  ))}
                </div>
            </div>

              {/* Resumen del pedido */}
            <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold mb-4">Resumen del Pedido</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Envío</span>
                      <span>${envio}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${(subtotal + envio).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={isProcessingOrder || cartItems.length === 0}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors mt-6 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {isProcessingOrder ? 'Procesando...' : 'Proceder al Pago'}
                </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}


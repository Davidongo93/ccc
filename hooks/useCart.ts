import { useState, useEffect } from 'react';
import { buildApiUrl } from '../config/api.config';
import { toast } from 'react-hot-toast';

interface CartItem {
  variantId: string;
  quantity: number;
  title: string;
  price: number;
  image?: string;
}

interface UseCartReturn {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (variantId: string) => void;
  clearCart: () => void;
  createOrder: (customerId: string, shippingAddress?: {
    address1: string;
    city: string;
    province: string;
    zip: string;
    country: string;
  }) => Promise<void>;
}

export const useCart = (): UseCartReturn => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Cargar items del carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // Guardar items en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (newItem: CartItem) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.variantId === newItem.variantId);
      if (existingItem) {
        return currentItems.map(item =>
          item.variantId === newItem.variantId
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }
      return [...currentItems, newItem];
    });
    toast.success('Producto agregado al carrito');
  };

  const removeFromCart = (variantId: string) => {
    setItems(currentItems => currentItems.filter(item => item.variantId !== variantId));
    toast.success('Producto eliminado del carrito');
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('cart');
  };

  const createOrder = async (customerId: string, shippingAddress?: {
    address1: string;
    city: string;
    province: string;
    zip: string;
    country: string;
  }) => {
    try {
      console.log('Iniciando creación de orden...', { 
        customerId, 
        items: items.map(item => ({
          ...item,
          variantId: item.variantId.includes('gid://') ? item.variantId : `gid://shopify/ProductVariant/${item.variantId}`
        }))
      });
      
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No se encontró token de autenticación');
        toast.error('Debes iniciar sesión para realizar un pedido');
        throw new Error('Usuario no autenticado');
      }

      if (items.length === 0) {
        console.error('El carrito está vacío');
        toast.error('El carrito está vacío');
        throw new Error('Carrito vacío');
      }

      // Asegurarse de que los IDs de las variantes estén en el formato correcto
      const formattedLineItems = items.map(item => ({
        variantId: item.variantId.includes('gid://') ? item.variantId : `gid://shopify/ProductVariant/${item.variantId}`,
        quantity: item.quantity
      }));

      console.log('Enviando petición al backend...', {
        customerId,
        lineItems: formattedLineItems,
        shippingAddress
      });

      const response = await fetch(buildApiUrl('orders'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          customerId,
          lineItems: formattedLineItems,
          shippingAddress
        })
      });

      console.log('Respuesta del backend:', { 
        status: response.status,
        statusText: response.statusText
      });
      
      if (!response.ok) {
        const error = await response.json();
        console.error('Error del backend:', error);
        throw new Error(error.message || 'Error al crear la orden');
      }

      const orderData = await response.json();
      console.log('Orden creada exitosamente:', orderData);

      // Limpiar el carrito después de crear la orden exitosamente
      clearCart();
      toast.success('Pedido creado exitosamente');
    } catch (error) {
      console.error('Error detallado al crear orden:', error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Error al crear el pedido');
      }
      throw error;
    }
  };

  return {
    items,
    addToCart,
    removeFromCart,
    clearCart,
    createOrder
  };
}; 
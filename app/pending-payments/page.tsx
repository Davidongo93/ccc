'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Navbar from "../../components/landing/navbar";
import Footer from 'components/landing/footer';
import { useShopifyOrder } from "../../hooks/useShopifyOrder";
import { useAuth } from "../../hooks/useAuth";

interface PendingOrder {
  id: string;
  orderNumber: number;
  totalPrice: string;
  status: string;
  createdAt: string;
}

export default function PendingPaymentsPage() {
  const [pendingOrders, setPendingOrders] = useState<PendingOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getPaymentUrl } = useShopifyOrder();
  const { user } = useAuth();

  useEffect(() => {
    const fetchPendingOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token || !user) {
          toast.error('Debes iniciar sesión para ver tus pedidos pendientes');
          return;
        }

        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/orders/pending/${user.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Error al obtener pedidos pendientes');
        }

        const orders = await response.json();
        setPendingOrders(Array.isArray(orders) ? orders : []);
      } catch (error) {
        console.error('Error:', error);
        toast.error('Error al cargar los pedidos pendientes');
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchPendingOrders();
    }
  }, [user]);

  const handlePayment = async (orderId: string) => {
    try {
      const checkoutUrl = await getPaymentUrl(orderId);
      if (checkoutUrl) {
        // Redirigir al checkout nativo de Shopify
        window.location.href = checkoutUrl;
      } else {
        toast.error('No se pudo obtener la URL de checkout');
      }
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      toast.error('Error al procesar el pago');
    }
  };

  return (
    <main className="bg-gray-50 text-gray-900 min-h-screen">
      <Navbar />
      <section
        className="relative py-40 p-4"
        style={{
          backgroundImage: "url('/images/web-fondo-blanco.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Pagos Pendientes</h1>
          
          {isLoading ? (
            <div className="text-center">
              <p>Cargando pedidos pendientes...</p>
            </div>
          ) : pendingOrders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-xl mb-4">No tienes pagos pendientes</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">Orden #{order.orderNumber}</p>
                    <p className="text-gray-600">Total: ${order.totalPrice}</p>
                    <p className="text-sm text-gray-500">
                      Fecha: {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handlePayment(order.id)}
                    className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
                  >
                    Pagar Ahora
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
} 
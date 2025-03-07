'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { API_ROUTES } from '../../../../config/api.config';

interface PaymentPageProps {
  params: Promise<{ orderId: string; }>;
}

export default function PaymentPage({ params }: PaymentPageProps) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<string>('pending');

  useEffect(() => {
    const processPayment = async () => {
      try {
        setIsProcessing(true);
        
        // Simular procesamiento de pago
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Verificar el estado del pago
        const { orderId } = await params;
        const response = await fetch(`${API_ROUTES.ORDERS}/payment-status/${orderId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Error al verificar el estado del pago');
        }

        const { status } = await response.json();
        setPaymentStatus(status);

        if (status === 'paid') {
          toast.success('¡Pago completado con éxito!');
          // Redirigir a la página de confirmación
          router.push('/checkout/success');
        } else if (status === 'failed') {
          toast.error('El pago ha fallado. Por favor, intente nuevamente.');
          router.push('/cart');
        }
      } catch (error) {
        console.error('Error al procesar el pago:', error);
        toast.error('Error al procesar el pago');
      } finally {
        setIsProcessing(false);
      }
    };

    processPayment();
  }, [params, router]);

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Procesando tu pago</h1>
        
        {isProcessing ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Procesando tu pago...</p>
          </div>
        ) : (
          <div className="text-center">
            {paymentStatus === 'paid' && (
              <div className="text-green-600">
                <p className="text-xl font-semibold">¡Pago completado!</p>
                <p className="mt-2">Redirigiendo a la página de confirmación...</p>
              </div>
            )}
            
            {paymentStatus === 'failed' && (
              <div className="text-red-600">
                <p className="text-xl font-semibold">El pago ha fallado</p>
                <p className="mt-2">Por favor, intenta nuevamente</p>
                <button
                  onClick={() => router.push('/cart')}
                  className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                >
                  Volver al carrito
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 
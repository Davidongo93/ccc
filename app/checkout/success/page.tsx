'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CheckoutSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Limpiar el carrito local después de un pago exitoso
    localStorage.removeItem('storedCart');
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            ¡Pago Completado con Éxito!
          </h1>
          
          <p className="text-gray-600 mb-8">
            Gracias por tu compra. Hemos enviado un correo electrónico con los detalles de tu pedido.
          </p>

          <div className="space-y-4">
            <Link
              href="/orders"
              className="block w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Ver mis pedidos
            </Link>
            
            <Link
              href="/"
              className="block w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors"
            >
              Volver a la tienda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 
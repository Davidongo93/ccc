'use client';

import { useEffect } from 'react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Opcionalmente podrías registrar el error en un servicio de análisis
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-bold text-[#2f450d]">:-(</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mt-4">
          Algo salió mal
        </h2>
        <p className="mt-4 text-gray-600">
          Lo sentimos, ha ocurrido un error inesperado. Por favor, intenta de nuevo.
        </p>
        <div className="mt-8 space-x-4">
          <button
            onClick={reset}
            type="button"
            className="inline-block px-6 py-3 rounded-md bg-[#2f450d] text-white hover:bg-[#3a5611] transition-colors duration-200"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    </div>
  );
}

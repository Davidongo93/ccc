import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-bold text-[#2f450d]">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mt-4">
          Página no encontrada
        </h2>
        <p className="mt-4 text-gray-600">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <Link 
          href="/"
          className="mt-8 inline-block px-6 py-3 rounded-md bg-[#2f450d] text-white hover:bg-[#3a5611] transition-colors duration-200"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
} 
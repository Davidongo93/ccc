import Navbar from "../../components/layout/navbar";
import { 
  Award, 
  Heart, 
  Leaf, 
  Shield, 
  ShoppingBag, 
  Star 
} from "lucide-react";

export default function StyleGuidePage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-gray-900 mb-16">Guía de Estilos CCC</h1>

        {/* Colores Corporativos */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Colores Corporativos</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-24 bg-[#2f450d] rounded-lg"></div>
              <p className="text-sm">Primary Green</p>
              <code className="text-sm text-gray-600">bg-[#2f450d]</code>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-[#e8f5e9] rounded-lg"></div>
              <p className="text-sm">Light Green</p>
              <code className="text-sm text-gray-600">bg-[#e8f5e9]</code>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-gray-900 rounded-lg"></div>
              <p className="text-sm">Dark Gray</p>
              <code className="text-sm text-gray-600">bg-gray-900</code>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-gray-50 rounded-lg border"></div>
              <p className="text-sm">Background Gray</p>
              <code className="text-sm text-gray-600">bg-gray-50</code>
            </div>
          </div>
        </section>

        {/* Tipografía */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Tipografía</h2>
          <div className="space-y-6">
            <div>
              <h1 className="text-5xl font-bold mb-2">Heading 1</h1>
              <code className="text-sm text-gray-600">text-5xl font-bold</code>
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-2">Heading 2</h2>
              <code className="text-sm text-gray-600">text-4xl font-bold</code>
            </div>
            <div>
              <h3 className="text-3xl font-semibold mb-2">Heading 3</h3>
              <code className="text-sm text-gray-600">text-3xl font-semibold</code>
            </div>
            <div>
              <p className="text-xl mb-2">Texto Grande</p>
              <code className="text-sm text-gray-600">text-xl</code>
            </div>
            <div>
              <p className="text-base mb-2">Texto Regular</p>
              <code className="text-sm text-gray-600">text-base</code>
            </div>
            <div>
              <p className="text-sm mb-2">Texto Pequeño</p>
              <code className="text-sm text-gray-600">text-sm</code>
            </div>
          </div>
        </section>

        {/* Botones */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Botones</h2>
          <div className="space-y-4">
            <div className="space-x-4">
              <button className="bg-[#2f450d] hover:bg-[#3a5611] text-white px-4 py-2 rounded-md transition-colors duration-200">
                Botón Principal
              </button>
              <button className="border border-[#2f450d] text-[#2f450d] hover:bg-[#2f450d] hover:text-white px-4 py-2 rounded-md transition-colors duration-200">
                Botón Secundario
              </button>
              <button className="text-[#2f450d] hover:bg-[#e8f5e9] px-4 py-2 rounded-md transition-colors duration-200">
                Botón Ghost
              </button>
            </div>
            <div className="space-x-4">
              <button className="bg-[#2f450d] hover:bg-[#3a5611] text-white px-3 py-1 text-sm rounded-md transition-colors duration-200">
                Botón Pequeño
              </button>
              <button className="bg-[#2f450d] hover:bg-[#3a5611] text-white px-4 py-2 rounded-md transition-colors duration-200">
                Botón Mediano
              </button>
              <button className="bg-[#2f450d] hover:bg-[#3a5611] text-white px-6 py-3 rounded-md transition-colors duration-200">
                Botón Grande
              </button>
            </div>
            <div className="space-x-4">
              <button disabled className="bg-[#2f450d] text-white px-4 py-2 rounded-md opacity-50 cursor-not-allowed">
                Botón Deshabilitado
              </button>
              <button className="bg-[#2f450d] hover:bg-[#3a5611] text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                Botón con Icono
              </button>
            </div>
          </div>
        </section>

        {/* Iconos */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Iconos</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#e8f5e9]">
                <Leaf className="h-8 w-8 text-[#2f450d]" />
              </div>
              <span className="text-sm">Leaf</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#e8f5e9]">
                <Heart className="h-8 w-8 text-[#2f450d]" />
              </div>
              <span className="text-sm">Heart</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#e8f5e9]">
                <Award className="h-8 w-8 text-[#2f450d]" />
              </div>
              <span className="text-sm">Award</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#e8f5e9]">
                <Shield className="h-8 w-8 text-[#2f450d]" />
              </div>
              <span className="text-sm">Shield</span>
            </div>
          </div>
        </section>

        {/* Tarjetas */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Tarjetas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tarjeta de Producto */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48 bg-gray-200">
                <div className="absolute inset-0 flex items-center justify-center">
                  <ShoppingBag className="h-12 w-12 text-gray-400" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Nombre del Producto</h3>
                <p className="text-gray-600 mb-4">Descripción corta del producto</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#2f450d] font-bold">$99.99</span>
                  <button className="bg-[#2f450d] hover:bg-[#3a5611] text-white px-4 py-2 text-sm rounded-md transition-colors duration-200">
                    Agregar
                  </button>
                </div>
              </div>
            </div>

            {/* Tarjeta de Característica */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f5e9]">
                <Star className="h-6 w-6 text-[#2f450d]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Título de Característica</h3>
              <p className="text-gray-600">Descripción de la característica del producto o servicio.</p>
            </div>

            {/* Tarjeta de Testimonio */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h4 className="font-semibold">Nombre Cliente</h4>
                  <p className="text-sm text-gray-600">Cargo / Empresa</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"Testimonio del cliente sobre el producto o servicio."</p>
            </div>
          </div>
        </section>

        {/* Fondos */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Fondos</h2>
          <div className="space-y-4">
            <div className="h-48 rounded-lg bg-[#e8f5e9] flex items-center justify-center">
              <p className="text-xl font-semibold text-[#2f450d]">Fondo Light Green</p>
            </div>
            <div className="h-48 rounded-lg bg-[#2f450d] flex items-center justify-center">
              <p className="text-xl font-semibold text-white">Fondo Dark Green</p>
            </div>
          </div>
        </section>

        {/* Espaciado */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Espaciado</h2>
          <div className="space-y-4">
            <div className="bg-[#e8f5e9] p-4">
              <code>p-4 (1rem / 16px)</code>
            </div>
            <div className="bg-[#e8f5e9] p-6">
              <code>p-6 (1.5rem / 24px)</code>
            </div>
            <div className="bg-[#e8f5e9] p-8">
              <code>p-8 (2rem / 32px)</code>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
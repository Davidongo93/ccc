import Features from 'components/landing/features';
import Footer from 'components/landing/footer';
import Navbar from 'components/landing/navbar';

const Nosotros = () => {
  return (
    <main className="bg-gray-50 text-gray-900">
      <Navbar />
      <section
        className="relative py-40"
        style={{
          backgroundImage: "url('/images/web-fondo-blanco.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-white/50" />
        <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
          {/* Title and Intro */}
          <div>
            <h1 className="pb-6 text-center text-2xl font-bold sm:mb-4 sm:text-3xl md:text-4xl 2xl:text-5xl">
              Acerca de Nosotros
            </h1>
            <p className="pb-6 text-lg leading-relaxed text-gray-600">
              Colombian Cannabis Center SAS constituida en 2018 con capital 100% Colombiano cuenta
              con un excelente equipo multidisciplinario compuesto por agrónomos, científicos,
              abogados y médicos altamente calificados y comprometidos con el cultivo sostenible.
            </p>
            <p className="pb-6 text-lg leading-relaxed text-gray-600">
              Trabajamos en sinergia conforme la legislación Colombiana y teniendo en cuenta los
              requerimientos y legislaciones a nivel nacional e internacional.
            </p>
          </div>

          {/* Mission and Vision */}
          <div className="grid gap-12 md:grid-cols-2">
            <div className="flex flex-col items-center rounded-lg bg-white/90 p-6 shadow-lg">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m-6-7a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Misión</h2>
              <p className="mt-4 text-center leading-relaxed text-gray-600">
                Desarrollar una excelente calidad de cannabinoides para uso en investigación
                científica y medicinal, impactando así la calidad de vida de nuestros usuarios.
              </p>
            </div>
            <div className="flex flex-col items-center rounded-lg bg-white/90 p-6 shadow-lg">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 10V4a1 1 0 112 0v6a4 4 0 11-8 0V4a1 1 0 112 0v6a2 2 0 104 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Visión</h2>
              <p className="mt-4 text-center leading-relaxed text-gray-600">
                Para 2025 ser una de las empresas colombianas de Cannabis más representativas en el
                mercado a nivel nacional e internacional, por sus altos estándares, calidad y
                compromiso junto con un extraordinario grupo humano.
              </p>
            </div>
          </div>

          {/* Why Colombia */}
          <div className="mt-16 rounded-lg bg-green-50 p-8 shadow-md">
            <h2 className="mb-4 text-center text-3xl font-bold text-green-700">
              ¿Por qué Colombia?
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-gray-700">
              Tenemos la ventaja de estar ubicados en una zona geográfica que nos brinda condiciones
              climáticas únicas y nos permite el cultivo de Cannabis de alta calidad durante todo el
              año, garantizando sostenibilidad y eficiencia en su proceso.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              Colombia está llamada a producir un significativo volumen de alta calidad para así, en
              poco tiempo, liderar a nivel nacional e internacional la producción sostenible de
              Cannabis Medicinal.
            </p>
          </div>

          {/* Additional Call-to-Action Section */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              ¡Conócenos y sé parte de la revolución sostenible!
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              Creemos en el poder de la naturaleza para transformar vidas. Únete a nuestro esfuerzo
              para cultivar un futuro más saludable y sostenible.
            </p>
          </div>
        </div>
      </section>

      <Features />
      <Footer />
    </main>
  );
};

export default Nosotros;

import { Award, Heart, Leaf, Shield } from 'lucide-react';

const Features = () => {
  return (
    <section id="nosotros" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">¿Por qué Elegirnos?</h2>
          <p className="text-xl text-gray-600">
            Nos dedicamos a proporcionar productos de cannabis medicinal de la más alta calidad
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="text-center">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Leaf className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">Productos Naturales</h3>
            <p className="text-gray-600">100% orgánico y cultivado de manera sostenible</p>
          </div>

          <div className="text-center">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Heart className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">Beneficios Terapéuticos</h3>
            <p className="text-gray-600">Propiedades medicinales comprobadas</p>
          </div>

          <div className="text-center">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Award className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">Calidad Certificada</h3>
            <p className="text-gray-600">Cumplimos con los más altos estándares</p>
          </div>

          <div className="text-center">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">Seguridad Garantizada</h3>
            <p className="text-gray-600">Productos testeados y seguros</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Features;

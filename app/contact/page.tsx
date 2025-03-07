'use client';
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Footer from "components/landing/footer";
import { useState } from "react";

// Define la interfaz de los datos del formulario
interface FormData {
  name: string;
  email: string;
  message: string;
}

// Define el esquema de validación con yup
const schema = yup.object().shape({
  name: yup.string().required("El nombre es obligatorio"),
  email: yup
    .string()
    .email("El email no es válido")
    .required("El email es obligatorio"),
  message: yup.string().required("El mensaje es obligatorio"),
});

const Contact = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null); // Estado para mensaje de error

  // Usamos useForm con la interfaz FormData
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  // Función que se ejecuta al enviar el formulario
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSuccess(true);
        setError(null); // Limpiar cualquier error anterior
        reset();
      } else {
        throw new Error("Error al enviar el mensaje");
      }
    } catch (error) {
      console.error("Error en el formulario:", error);
      setSuccess(false);
      setError("Hubo un problema al enviar el mensaje. Intenta nuevamente."); // Mostrar error al usuario
    }
    console.log("Resultado del envío:", error); // Esto es solo para ver la respuesta
  };

  return (
    
    <main className="bg-gray-50 text-gray-500">
      <section
        id="contacto"
        className="py-20 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/web-fondo-blanco.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 mt-8">
              Contáctanos
            </h2>
            <p className="text-xl text-gray-600">
              ¿Tienes preguntas? Estamos aquí para ayudarte
            </p>
          </div>

          <div className="max-w-xl mx-auto">
            {success && (
              <p className="text-green-600 text-center mb-4">
                Mensaje enviado correctamente
              </p>
            )}
            {error && (
              <p className="text-red-600 text-center mb-4">
                {error}
              </p>
            )}
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 bg-slate-300"
                />
                <p className="text-red-500 text-sm">{errors.name?.message}</p>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 bg-slate-300"
                />
                <p className="text-red-500 text-sm">{errors.email?.message}</p>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  rows={4}
                  {...register("message")}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 bg-slate-300"
                />
                <p className="text-red-500 text-sm">{errors.message?.message}</p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 rounded-md text-white bg-[#2f450d] hover:bg-[#3a5611] disabled:bg-gray-400"
              >
                {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Contact;


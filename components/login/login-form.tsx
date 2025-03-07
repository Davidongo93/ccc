"use client";

import type React from "react";
import { useState } from "react";
import { StyledInput } from "./styled-components";
import { API_ROUTES } from "../../config/api.config";
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

export interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");

  const validateForm = () => {
    const newErrors: Partial<Record<keyof LoginFormData, string>> = {};

    if (!formData.email) {
      newErrors.email = "El correo electrónico es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "El correo electrónico no es válido";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
    } else if (formData.password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");
    setIsLoading(true);

    if (validateForm()) {
      try {
        console.log('Intentando login con: ', formData);
        
        const response = await fetch(API_ROUTES.LOGIN, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
          credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok) {
          console.log('Respuesta del servidor:', response.status);
          console.error('Detalles del error:', data);
          throw new Error(data.message || 'Error en el inicio de sesión');
        }

        // Guardar el token de acceso
        localStorage.setItem('token', data.access_token);

        toast.success('Inicio de sesión exitoso');
        router.push('/products');
      } catch (error) {
        console.error('Error en login:', error);
        setSubmitError(error instanceof Error ? error.message : 'Error al iniciar sesión');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof LoginFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {submitError && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{submitError}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <StyledInput
        required
        id="email"
        name="email"
        label="Correo electrónico"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
      />

      <StyledInput
        required
        id="password"
        name="password"
        label="Contraseña"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password}
      />

      <div className="flex items-center justify-between">
        <div className="text-sm">
          <Link
            href="/recuperar-password"
            className="font-medium text-[#2f450d] hover:text-[#3a5611]"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
      >
        {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
      </button>
    </form>
  );
} 
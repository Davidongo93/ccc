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
      newErrors.email = "El correo electrónico es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ingresa un correo electrónico válido";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");
    
    if (validateForm()) {
      setIsLoading(true);
      try {
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
          let errorMessage = "Error al iniciar sesión";
          
          switch (response.status) {
            case 401:
              errorMessage = "Correo electrónico o contraseña incorrectos";
              break;
            case 422:
              errorMessage = "Datos de inicio de sesión inválidos";
              break;
            case 429:
              errorMessage = "Demasiados intentos fallidos. Por favor, espera unos minutos";
              break;
            default:
              errorMessage = data.message || "Error al iniciar sesión";
          }
          
          setSubmitError(errorMessage);
          toast.error(errorMessage);
          return;
        }

        // Guardar el token de acceso
        localStorage.setItem('token', data.access_token);

        // Disparar evento de cambio de autenticación
        window.dispatchEvent(new Event('authStateChanged'));

        toast.success('¡Bienvenido de nuevo!');
        router.push('/products');
      } catch (error) {
        // Manejo silencioso del error en consola
        const errorMessage = "Error al conectar con el servidor. Por favor, intenta más tarde.";
        setSubmitError(errorMessage);
        toast.error(errorMessage);
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

    const newErrors = { ...errors };
    delete newErrors[name as keyof LoginFormData];

    switch (name) {
      case 'email':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = "Ingresa un correo electrónico válido";
        }
        break;
      case 'password':
        if (value && value.length < 8) {
          newErrors.password = "La contraseña debe tener al menos 8 caracteres";
        }
        break;
    }

    setErrors(newErrors);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      {submitError && (
        <div className="rounded-md bg-red-50 p-4 border border-red-200">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error de acceso</h3>
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
        placeholder="ejemplo@correo.com"
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
        placeholder="Ingresa tu contraseña"
        autoComplete="current-password"
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
"use client";

import type React from "react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import "./phone-input.css";
import { StyledInput } from "./styled-components";
import { API_ROUTES } from "../../config/api.config";

export interface RegistroFormData {
  nombre: string;
  telefono: string;
  email: string;
  password: string;
  confirmPassword: string;
  departamento: string;
  municipio: string;
  calle: string;
  codigoPostal: string;
}

export default function RegistroForm() {
  const [formData, setFormData] = useState<RegistroFormData>({
    nombre: "",
    telefono: "",
    email: "",
    password: "",
    confirmPassword: "",
    departamento: "",
    municipio: "",
    calle: "",
    codigoPostal: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof RegistroFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");

  const validateForm = () => {
    const newErrors: Partial<Record<keyof RegistroFormData, string>> = {};

    // Validación de campos requeridos
    if (!formData.nombre) {
      newErrors.nombre = "El nombre es requerido";
    }

    if (!formData.telefono) {
      newErrors.telefono = "El teléfono es requerido";
    } else if (!/^\+?[\d\s-]+$/.test(formData.telefono)) {
      newErrors.telefono = "El número de teléfono no es válido";
    }

    if (!formData.email) {
      newErrors.email = "El correo electrónico es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "El correo electrónico no es válido";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
    } else if (formData.password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres";
    } else if (formData.password.length > 15) {
      newErrors.password = "La contraseña no puede tener más de 15 caracteres";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Debe confirmar la contraseña";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    // Los campos de dirección son opcionales, pero si se proporcionan deben ser válidos
    if (formData.departamento && formData.departamento.length > 50) {
      newErrors.departamento = "El departamento no puede tener más de 50 caracteres";
    }

    if (formData.municipio && formData.municipio.length > 50) {
      newErrors.municipio = "El municipio no puede tener más de 50 caracteres";
    }

    if (formData.calle && formData.calle.length > 25) {
      newErrors.calle = "La dirección no puede tener más de 25 caracteres";
    }

    if (formData.codigoPostal && formData.codigoPostal.length > 10) {
      newErrors.codigoPostal = "El código postal no puede tener más de 10 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const { confirmPassword, ...dataToSend } = formData;
        const response = await fetch(API_ROUTES.REGISTER, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: dataToSend.nombre,
            email: dataToSend.email,
            password: dataToSend.password,
            passwordConfirmation: confirmPassword,
            phone: dataToSend.telefono,
            province: dataToSend.departamento,
            city: dataToSend.municipio,
            address: dataToSend.calle,
            zipCode: dataToSend.codigoPostal
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al registrar usuario');
        }

        // Registro exitoso
        const data = await response.json();
        console.log('Usuario registrado:', data);
        // TODO: Redirigir al usuario a la página de inicio de sesión o dashboard
      } catch (error) {
        setSubmitError(error instanceof Error ? error.message : 'Error al registrar usuario');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name as keyof RegistroFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      telefono: value,
    }));
    if (errors.telefono) {
      setErrors((prev) => ({
        ...prev,
        telefono: "",
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
        id="nombre"
        name="nombre"
        label="Nombre completo"
        value={formData.nombre}
        onChange={handleChange}
        error={!!errors.nombre}
        helperText={errors.nombre}
      />

      <div className="space-y-1">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Número de teléfono
        </label>
        <PhoneInput
          country="co"
          value={formData.telefono}
          onChange={handlePhoneChange}
          containerClass="phone-input-hover"
          inputStyle={{
            width: "100%",
            height: "56px",
            borderColor: errors.telefono ? "#ef4444" : "rgba(0, 0, 0, 0.23)",
            color: "black",
            transition: "all 0.2s ease-in-out"
          }}
          containerStyle={{
            width: "100%",
          }}
          buttonStyle={{
            backgroundColor: "transparent",
            borderColor: errors.telefono ? "#ef4444" : "rgba(0, 0, 0, 0.23)",
            borderRadius: "4px 0 0 4px",
            transition: "all 0.2s ease-in-out"
          }}
          onlyCountries={["co"]}
          disableDropdown={true}
          countryCodeEditable={false}
          inputProps={{
            required: true,
            name: "telefono",
            id: "phone",
          }}
        />
        {errors.telefono && (
          <p className="mt-1 text-sm text-red-500">{errors.telefono}</p>
        )}
      </div>

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
        autoComplete="new-password"
        value={formData.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password}
      />

      <StyledInput
        required
        id="confirmPassword"
        name="confirmPassword"
        label="Confirmar contraseña"
        type="password"
        autoComplete="new-password"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword}
      />

      <div className="grid grid-cols-2 gap-4">
        <StyledInput
          required
          id="departamento"
          name="departamento"
          label="Departamento"
          value={formData.departamento}
          onChange={handleChange}
          error={!!errors.departamento}
          helperText={errors.departamento}
        />

        <StyledInput
          required
          id="municipio"
          name="municipio"
          label="Municipio"
          value={formData.municipio}
          onChange={handleChange}
          error={!!errors.municipio}
          helperText={errors.municipio}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <StyledInput
          required
          id="calle"
          name="calle"
          label="Dirección de calle"
          value={formData.calle}
          onChange={handleChange}
          error={!!errors.calle}
          helperText={errors.calle}
        />

        <StyledInput
          required
          id="codigoPostal"
          name="codigoPostal"
          label="Código postal"
          value={formData.codigoPostal}
          onChange={handleChange}
          error={!!errors.codigoPostal}
          helperText={errors.codigoPostal}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2f450d] hover:bg-[#3a5611] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2f450d] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Registrando..." : "Registrarse"}
      </button>
    </form>
  );
} 
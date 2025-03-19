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
  apellido: string;
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
    apellido: "",
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

    // Validación del nombre
    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    } else if (formData.nombre.trim().length < 2) {
      newErrors.nombre = "El nombre debe tener al menos 2 caracteres";
    } else if (formData.nombre.trim().length > 50) {
      newErrors.nombre = "El nombre no puede exceder los 50 caracteres";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.nombre.trim())) {
      newErrors.nombre = "El nombre solo puede contener letras y espacios";
    }

    // Validación del apellido (ahora obligatorio)
    if (!formData.apellido.trim()) {
      newErrors.apellido = "El apellido es obligatorio";
    } else if (formData.apellido.trim().length > 50) {
      newErrors.apellido = "El apellido no puede exceder los 50 caracteres";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.apellido.trim())) {
      newErrors.apellido = "El apellido solo puede contener letras y espacios";
    }

    // Validación del teléfono
    if (!formData.telefono) {
      newErrors.telefono = "El teléfono es obligatorio";
    } else {
      // Limpiamos el número de cualquier caracter que no sea dígito
      const cleanNumber = formData.telefono.replace(/\D/g, '');
      
      // Validamos el formato de Colombia
      if (cleanNumber.length < 10) {
        newErrors.telefono = "El número debe tener al menos 10 dígitos";
      } else if (!cleanNumber.startsWith('57')) {
        newErrors.telefono = "El número debe empezar con el código de Colombia (+57)";
      } else {
        const numberWithoutCode = cleanNumber.substring(2);
        const firstDigit = numberWithoutCode.charAt(0);
        
        if (numberWithoutCode.length === 10) {
          // Validar celular (debe empezar con 3)
          if (firstDigit !== '3') {
            newErrors.telefono = "Los números celulares en Colombia deben empezar con 3";
          }
        } else if (numberWithoutCode.length === 7) {
          // Validar teléfono fijo (debe tener código de área válido)
          const areaCodes = ['1', '2', '4', '5', '6', '7', '8'];
          if (!areaCodes.includes(firstDigit)) {
            newErrors.telefono = "Código de área inválido para teléfono fijo";
          }
        } else {
          newErrors.telefono = "Formato de número colombiano inválido";
        }
      }
    }

    // Validación del email
    if (!formData.email) {
      newErrors.email = "El correo electrónico es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ingresa un correo electrónico válido (ejemplo@dominio.com)";
    }

    // Validación de la contraseña
    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (formData.password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres";
    } else if (formData.password.length > 15) {
      newErrors.password = "La contraseña no puede tener más de 15 caracteres";
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password = "La contraseña debe contener al menos una letra mayúscula";
    } else if (!/(?=.*[a-z])/.test(formData.password)) {
      newErrors.password = "La contraseña debe contener al menos una letra minúscula";
    } else if (!/(?=.*\d)/.test(formData.password)) {
      newErrors.password = "La contraseña debe contener al menos un número";
    } else if (!/(?=.*[!@#$%^&*])/.test(formData.password)) {
      newErrors.password = "La contraseña debe contener al menos un carácter especial (!@#$%^&*)";
    }

    // Validación de confirmación de contraseña
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Debes confirmar la contraseña";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    // Validación del departamento (ahora obligatorio)
    if (!formData.departamento) {
      newErrors.departamento = "El departamento es obligatorio";
    } else if (formData.departamento.length > 50) {
      newErrors.departamento = "El departamento no puede exceder los 50 caracteres";
    }

    // Validación del municipio (ahora obligatorio)
    if (!formData.municipio) {
      newErrors.municipio = "El municipio es obligatorio";
    } else if (formData.municipio.length > 50) {
      newErrors.municipio = "El municipio no puede exceder los 50 caracteres";
    }

    // Validación de la calle (ahora obligatorio)
    if (!formData.calle) {
      newErrors.calle = "La dirección es obligatoria";
    } else if (formData.calle.length > 100) {
      newErrors.calle = "La dirección no puede exceder los 100 caracteres";
    }

    // Validación del código postal (ahora obligatorio)
    if (!formData.codigoPostal) {
      newErrors.codigoPostal = "El código postal es obligatorio";
    } else if (formData.codigoPostal.length > 10) {
      newErrors.codigoPostal = "El código postal no puede exceder los 10 caracteres";
    } else if (!/^\d+$/.test(formData.codigoPostal)) {
      newErrors.codigoPostal = "El código postal solo puede contener números";
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
            name: dataToSend.nombre + (dataToSend.apellido ? ' ' + dataToSend.apellido : ''),
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

    // Validación en tiempo real
    const newErrors: Partial<Record<keyof RegistroFormData, string>> = { ...errors };
    delete newErrors[name as keyof RegistroFormData];

    // Validaciones específicas por campo
    switch (name) {
      case 'nombre':
        if (value.trim() && value.trim().length < 2) {
          newErrors.nombre = "El nombre debe tener al menos 2 caracteres";
        } else if (value.trim() && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value.trim())) {
          newErrors.nombre = "El nombre solo puede contener letras y espacios";
        }
        break;
      case 'apellido':
        if (!value.trim()) {
          newErrors.apellido = "El apellido es obligatorio";
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value.trim())) {
          newErrors.apellido = "El apellido solo puede contener letras y espacios";
        }
        break;
      case 'email':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = "Ingresa un correo electrónico válido";
        }
        break;
      case 'password':
        if (value && value.length < 8) {
          newErrors.password = "La contraseña debe tener al menos 8 caracteres";
        } else if (value && value.length > 15) {
          newErrors.password = "La contraseña no puede tener más de 15 caracteres";
        } else if (value && !/(?=.*[A-Z])/.test(value)) {
          newErrors.password = "Debe contener al menos una mayúscula";
        } else if (value && !/(?=.*[a-z])/.test(value)) {
          newErrors.password = "Debe contener al menos una minúscula";
        } else if (value && !/(?=.*\d)/.test(value)) {
          newErrors.password = "Debe contener al menos un número";
        } else if (value && !/(?=.*[!@#$%^&*])/.test(value)) {
          newErrors.password = "Debe contener al menos un carácter especial (!@#$%^&*)";
        }
        // Validar confirmPassword si ya tiene valor
        if (formData.confirmPassword && value !== formData.confirmPassword) {
          newErrors.confirmPassword = "Las contraseñas no coinciden";
        }
        break;
      case 'confirmPassword':
        if (value && value !== formData.password) {
          newErrors.confirmPassword = "Las contraseñas no coinciden";
        }
        break;
      case 'codigoPostal':
        if (value && !/^\d+$/.test(value)) {
          newErrors.codigoPostal = "El código postal solo puede contener números";
        }
        break;
    }

    setErrors(newErrors);
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      telefono: value,
    }));
    
    // Validación en tiempo real para el teléfono
    const newErrors = { ...errors };
    const cleanNumber = value.replace(/\D/g, '');
    
    if (!value) {
      newErrors.telefono = "El teléfono es obligatorio";
    } else if (cleanNumber.length < 10) {
      newErrors.telefono = "El número debe tener al menos 10 dígitos";
    } else if (!cleanNumber.startsWith('57')) {
      newErrors.telefono = "El número debe empezar con el código de Colombia (+57)";
    } else {
      const numberWithoutCode = cleanNumber.substring(2);
      const firstDigit = numberWithoutCode.charAt(0);
      
      if (numberWithoutCode.length === 10) {
        // Validar celular
        if (firstDigit !== '3') {
          newErrors.telefono = "Los números celulares en Colombia deben empezar con 3";
        } else {
          delete newErrors.telefono;
        }
      } else if (numberWithoutCode.length === 7) {
        // Validar teléfono fijo
        const areaCodes = ['1', '2', '4', '5', '6', '7', '8'];
        if (!areaCodes.includes(firstDigit)) {
          newErrors.telefono = "Código de área inválido para teléfono fijo";
        } else {
          delete newErrors.telefono;
        }
      } else {
        newErrors.telefono = "Formato de número colombiano inválido";
      }
    }
    setErrors(newErrors);
  };

  return (
    <form 
      className="space-y-6" 
      onSubmit={handleSubmit}
      noValidate // Desactivar validación nativa del navegador
    >
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StyledInput
          required
          id="nombre"
          name="nombre"
          label="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          error={!!errors.nombre}
          helperText={errors.nombre}
          placeholder="Ingresa tu nombre"
        />

        <StyledInput
          required
          id="apellido"
          name="apellido"
          label="Apellido"
          value={formData.apellido}
          onChange={handleChange}
          error={!!errors.apellido}
          helperText={errors.apellido}
          placeholder="Ingresa tu apellido"
        />
      </div>

      <div>
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
            placeholder: "Ingresa tu número de teléfono"
          }}
        />
        {errors.telefono && (
          <div className="mt-1">
            <p className="text-sm text-red-500">Número inválido</p>
            <p className="text-xs text-red-400">Ingresa un número de teléfono colombiano válido</p>
          </div>
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
        placeholder="ejemplo@correo.com"
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
        placeholder="Mínimo 8 caracteres"
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
        placeholder="Repite tu contraseña"
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
          placeholder="Ej: Antioquia"
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
          placeholder="Ej: Medellín"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <StyledInput
          required
          id="calle"
          name="calle"
          label="Dirección"
          value={formData.calle}
          onChange={handleChange}
          error={!!errors.calle}
          helperText={errors.calle}
          placeholder="Ej: Calle 123 #45-67"
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
          placeholder="Ej: 050001"
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
"use client";

import { StyledInput } from "../../components/login/styled-components";
import type { FormEvent } from "react";
import { useState } from "react";

export default function RecuperarPasswordPage() {
	const [email, setEmail] = useState("");

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		console.log("Email para recuperación:", email);
	};

	return (
		<div className="min-h-screen bg-white flex flex-col pt-24 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
					Recuperar Contraseña
				</h2>
				<p className="mt-2 text-center text-sm text-gray-600">
					Ingresa tu correo electrónico y te enviaremos las instrucciones para restablecer tu contraseña.
				</p>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<form className="space-y-6" onSubmit={handleSubmit}>
						<StyledInput
							required
							id="email"
							name="email"
							label="Correo electrónico"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>

						<button
							type="submit"
							className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2f450d] hover:bg-[#3a5611] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2f450d]"
						>
							Enviar instrucciones
						</button>

						<div className="text-center">
							<a href="/login" className="font-medium text-[#2f450d] hover:text-[#3a5611] text-sm">
								Volver al inicio de sesión
							</a>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
} 
import LoginForm from "../../components/login/login-form";

export default function LoginPage() {
	return (
		<div className="min-h-screen bg-white flex flex-col pt-32 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
					Iniciar Sesión
				</h2>
				<p className="mt-2 text-center text-sm text-gray-600">
					¿No tienes una cuenta?{" "}
					<a href="/registro" className="font-medium text-[#2f450d] hover:text-[#3a5611]">
						Regístrate aquí
					</a>
				</p>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<LoginForm />
				</div>
			</div>
		</div>
	);
} 
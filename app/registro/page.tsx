import RegistroForm from "../../components/registro/registro-form";

export default function RegisterPage() {
	return (
		<div className="min-h-screen bg-white flex flex-col pt-24 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
					Crear una cuenta
				</h2>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<RegistroForm />
				</div>
			</div>
		</div>
	);
}

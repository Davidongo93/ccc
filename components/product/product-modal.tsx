"use client";

import type { Product } from "lib/shopify/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from 'next/navigation';
import { useCart } from "../../hooks/useCart";

interface ProductModalProps {
	product: Product;
	isOpen: boolean;
	onClose: () => void;
}

const VariantOptionDisplay = ({ name, values }: { name: string; values: string[] }) => {
	return (
		<div className="mb-4">
			<h3 className="text-sm font-medium text-gray-700 mb-2">{name}</h3>
			<div className="flex flex-wrap gap-2">
				{values.map((value) => (
					<span 
						key={value} 
						className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full border border-gray-200"
					>
						{value}
					</span>
				))}
			</div>
		</div>
	);
};

export default function ProductModal({
	product,
	isOpen,
	onClose,
}: ProductModalProps) {
	const router = useRouter();
	const { user } = useAuth();
	const { addToCart } = useCart();
	const [quantity, setQuantity] = useState(1);
	const [isAnimating, setIsAnimating] = useState(false);
	const [isAddingToCart, setIsAddingToCart] = useState(false);
	const [showAuthModal, setShowAuthModal] = useState(false);
	const { title, images, description, priceRange, options, variants } = product;
	const { amount, currencyCode } = priceRange.minVariantPrice;

	// Obtener el stock disponible de la primera variante
	const mainVariant = variants[0];
	const quantityAvailable = mainVariant?.quantityAvailable || 0;

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
			setIsAnimating(true);
			// Resetear la cantidad a 1 cuando se abre el modal
			setQuantity(1);
		} else {
			document.body.style.overflow = "unset";
			setIsAnimating(false);
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	const handleAddToCart = async () => {
		if (!user) {
			setShowAuthModal(true);
			return;
		}

		if (!variants || variants.length === 0) {
			toast.error('Este producto no está disponible');
			return;
		}

		const variant = variants[0];
		if (!variant || !variant.id) {
			toast.error('Este producto no está disponible');
			return;
		}

		if (quantity > quantityAvailable) {
			toast.error(`Solo hay ${quantityAvailable} unidades disponibles`);
			return;
		}

		try {
			setIsAddingToCart(true);
			
			const variantId = variant.id.includes('gid://') 
				? variant.id 
				: `gid://shopify/ProductVariant/${variant.id}`;

			addToCart({
				variantId,
				quantity,
				title,
				price: Number.parseFloat(amount),
				image: images[0]?.url || ''
			});
			
			toast.success('Producto agregado al carrito exitosamente');
			onClose();
		} catch (error) {
			console.error('Error al agregar al carrito:', error);
			toast.error('Error al agregar el producto al carrito');
		} finally {
			setIsAddingToCart(false);
		}
	};

	const handleNavigateToAuth = (type: 'login' | 'register') => {
		onClose();
		router.push(`/${type}`);
	};

	if (!isOpen) return null;

	// Filtrar las opciones que queremos mostrar (case-insensitive)
	const validOptions = options.filter(option => 
		option.name.toLowerCase() === "tejido" || 
		option.name.toLowerCase() === "sexo objetivo"
	);

	return (
		<>
			{/* Overlay principal */}
			<div 
				className={`fixed inset-0 top-[72px] bg-black transition-opacity duration-500 ease-in-out ${
					isAnimating ? 'opacity-60' : 'opacity-0'
				} z-40`}
				onClick={onClose}
				onKeyDown={(e) => {
					if (e.key === 'Escape') onClose();
				}}
				role="button"
				tabIndex={0}
			/>
			
			{/* Modal principal */}
			<div 
				className={`fixed top-[72px] bottom-0 right-0 w-full md:w-2/3 lg:w-1/2 bg-white shadow-xl z-50 overflow-hidden transform transition-all duration-500 ease-in-out ${
					isAnimating ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
				}`}
			>
				{/* Botón cerrar reposicionado */}
				<button
					type="button"
					onClick={onClose}
					className="absolute top-3 right-12 z-10 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors duration-200"
					aria-label="Cerrar modal"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						className="w-4 h-4"
						aria-hidden="true"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>

				<div className={`h-full flex flex-col transition-all duration-700 delay-100 ${
					isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
				}`}>
					<div className="flex-1 overflow-y-auto p-4 md:p-6">
						<h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>

						<div className="w-full md:w-2/3 lg:w-1/2 mx-auto mb-6">
							<div className="aspect-square relative rounded-lg overflow-hidden">
								{images[0] && (
									<Image
										src={images[0].url}
										alt={title}
										fill
										sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
										className="object-cover object-center"
									/>
								)}
							</div>
						</div>

						{validOptions.length > 0 && (
							<div className="mb-6">
								<div className="space-y-2">
									{validOptions.map((option) => (
										<VariantOptionDisplay 
											key={option.id}
											name={option.name}
											values={option.values}
										/>
									))}
								</div>
							</div>
						)}

						<div className="prose max-w-none mb-8">
							{description && (
								<div className="product-description text-sm md:text-base">
									{description}
								</div>
							)}
						</div>
					</div>

					{/* Sección inferior fija */}
					<div className="border-t">
						<div className="max-w-md mx-auto py-4 px-2">
							<div className="flex flex-col items-center space-y-4">
								<div className="flex items-center space-x-4">
									<button
										type="button"
										onClick={() => setQuantity(Math.max(1, quantity - 1))}
										className="w-8 h-8 rounded-full border border-[#2f450d] text-[#2f450d] flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
										aria-label="Disminuir cantidad"
									>
										-
									</button>
									<span className="text-lg">{quantity}</span>
									<button
										type="button"
										onClick={() => setQuantity(Math.min(quantityAvailable, quantity + 1))}
										className="w-8 h-8 rounded-full border border-[#2f450d] text-[#2f450d] flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
										aria-label="Aumentar cantidad"
										disabled={quantity >= quantityAvailable}
									>
										+
									</button>
								</div>
								<div className="text-center">
									<div className="text-xl font-bold mb-2" style={{ color: '#2f450d' }}>
										{(Number.parseFloat(amount) * quantity).toFixed(2)}{" "}
										{currencyCode}
									</div>
									{quantityAvailable === 0 ? (
										<p className="text-red-500 text-sm mb-2">Agotado</p>
									) : quantityAvailable < 5 ? (
										<p className="text-orange-500 text-sm mb-2">
											¡Solo quedan {quantityAvailable} unidades!
										</p>
									) : (
										<p className="text-green-600 text-sm mb-2">En stock</p>
									)}
									<button
										type="button"
										onClick={handleAddToCart}
										disabled={isAddingToCart || quantityAvailable === 0}
										className="bg-black text-white px-6 py-2 rounded-full text-sm hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
									>
										{isAddingToCart ? 'Agregando...' : quantityAvailable === 0 ? 'Agotado' : 'Agregar al carrito'}
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Modal de autenticación */}
			{showAuthModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
						<h3 className="text-xl font-semibold mb-4">Iniciar sesión requerido</h3>
						<p className="text-gray-600 mb-6">
							Para añadir productos al carrito, necesitas iniciar sesión o registrarte.
						</p>
						<div className="flex flex-col space-y-3">
							<button
								type="button"
								onClick={() => handleNavigateToAuth('login')}
								className="w-full bg-black text-white py-2 rounded-full hover:bg-gray-800 transition-colors"
							>
								Iniciar sesión
							</button>
							<button
								type="button"
								onClick={() => handleNavigateToAuth('register')}
								className="w-full border border-black text-black py-2 rounded-full hover:bg-gray-50 transition-colors"
							>
								Registrarse
							</button>
							<button
								type="button"
								onClick={() => setShowAuthModal(false)}
								className="w-full text-gray-600 py-2 hover:text-gray-800 transition-colors"
							>
								Cancelar
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

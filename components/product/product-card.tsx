"use client";	

import type { Product } from "lib/shopify/types";
import Image from "next/image";
import { type KeyboardEvent, useState } from "react";
import ProductModal from "./product-modal";
import { useStock } from "../../hooks/useStock";

export default function ProductCard({ product }: { product: Product }) {
	const { title, images, priceRange, variants } = product;
	const { amount, currencyCode } = priceRange.minVariantPrice;
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			setIsModalOpen(true);
		}
	};

	// Obtener el stock directamente de la primera variante
	const mainVariant = variants[0];
	const quantityAvailable = mainVariant?.quantityAvailable || 0;

	return (
		<>
			<button
				onClick={() => setIsModalOpen(true)}
				onKeyDown={handleKeyDown}
				type="button"
				className="w-full text-left group rounded-lg border border-[#2f450d] p-4 hover:shadow-lg shadow-md transition-shadow cursor-pointer bg-white"
			>
				<div className="aspect-square relative mb-4 overflow-hidden rounded-lg">
					{images[0] ? (
						<Image
							src={images[0].url}
							alt={images[0].altText}
							fill
							sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
							className="object-cover object-center"
						/>
					) : (
						<div className="h-full w-full bg-gray-100 flex items-center justify-center">
							<p className="text-gray-500">Sin imagen</p>
						</div>
					)}
				</div>
				<div className="text-center">
					<h3 className="text-lg font-medium" style={{ color: '#2f450d' }}>{title}</h3>
					<p className="mt-1 text-sm text-gray-900">
						{amount} {currencyCode}
					</p>
					<div className="mt-2">
						{quantityAvailable === 0 ? (
							<p className="text-red-500 text-sm">Agotado</p>
						) : quantityAvailable < 5 ? (
							<p className="text-orange-500 text-sm">
								¡Solo quedan {quantityAvailable} unidades!
							</p>
						) : (
							<p className="text-green-600 text-sm">En stock</p>
						)}
					</div>
				</div>
			</button>

			<ProductModal
				product={product}
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
		</>
	);
}

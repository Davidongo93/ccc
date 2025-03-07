import type { Product } from "lib/shopify/types";
import ProductCard from "./product-card";

export default function ProductGrid({ products }: { products: Product[] }) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
			{products.map((product) => (
				<ProductCard key={product.handle} product={product} />
			))}
		</div>
	);
}

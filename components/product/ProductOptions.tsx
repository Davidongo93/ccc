import type { Product } from "lib/shopify/types";

export function getProductOptions(products: Product[]) {
	const options = {
		Tejido: new Set<string>(),
		"Sexo objetivo": new Set<string>(),
	};

	for (const product of products) {
		for (const option of product.options) {
			if (option.name === "Tejido" || option.name === "Sexo objetivo") {
				for (const value of option.values) {
					options[option.name].add(value);
				}
			}
		}
	}

	return [
		{ name: "Tejido", values: Array.from(options.Tejido) },
		{ name: "Sexo objetivo", values: Array.from(options["Sexo objetivo"]) },
	];
} 
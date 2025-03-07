import type { Product } from "lib/shopify/types";

export function getProductOptions(products: Product[]) {
	const options: { Tejido: string[]; "Sexo objetivo": string[] } = {
		Tejido: [],
		"Sexo objetivo": [],
	};

	for (const product of products) {
		for (const option of product.options) {
			if (option.name === "Tejido" || option.name === "Sexo objetivo") {
				options[option.name].push(...option.values);
			}
		}
	}

	return [
		{ name: "Tejido", values: [...new Set(options.Tejido)] },
		{ name: "Sexo objetivo", values: [...new Set(options["Sexo objetivo"])] },
	];
}
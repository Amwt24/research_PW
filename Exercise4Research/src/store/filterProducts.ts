import type { Product } from "./productTypes";

export function filterProducts(
    products: Product[],
    searchTerm: string
): Product[] {
    return products.filter((product) =>
        product.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );
}
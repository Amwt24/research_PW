import type { Product } from "./productTypes";

export const products: Product[] =
    Array.from(
        { length: 3000 },
        (_, index) => ({
            id: index + 1,
            name: `Product ${index + 1}`,
            category:
                index % 2 === 0
                    ? "Electronics"
                    : "Books",
            price:
                Math.floor(Math.random() * 500) + 50
        })
    );
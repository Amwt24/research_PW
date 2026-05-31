import ProductCard from "./ProductCard";
import type { Product } from "../store/productTypes";

interface ProductListProps {
    products: Product[];
}

function ProductList({
    products
}: ProductListProps) {
    if (products.length === 0) {
        return (
            <p className="text-center text-gray-500">
                No products found.
            </p>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                />
            ))}
        </div>
    );
}

export default ProductList;
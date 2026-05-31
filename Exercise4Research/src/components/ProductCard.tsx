import type { Product } from "../store/productTypes";

interface ProductCardProps {
    product: Product;
}

function ProductCard({
    product
}: ProductCardProps) {
    return (
        <article className="border rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold">
                {product.name}
            </h3>

            <p className="text-sm text-gray-500">
                {product.category}
            </p>

            <p className="mt-2 font-medium">
                ${product.price}
            </p>
        </article>
    );
}

export default ProductCard;
import { useRef, useState } from "react";
import { useCartStore } from "../store/cartStore";

function ProductsPage() {
    const [products, setProducts] = useState<
        {
            id: number;
            name: string;
            price: number;
        }[]
    >([]);

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    const nameInputRef = useRef<HTMLInputElement>(null);

    const addToCart = useCartStore(
        (state) => state.addToCart
    );

    const handleAddProduct = () => {
        if (!name || !price) return;

        const newProduct = {
            id: Date.now(),
            name,
            price: Number(price),
        };

        setProducts((prev) => [...prev, newProduct]);

        setName("");
        setPrice("");

        nameInputRef.current?.focus();
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">
                Product Catalog
            </h1>

            <div className="border rounded-lg p-4 mb-8">
                <h2 className="text-xl font-semibold mb-4">
                    Add Product
                </h2>

                <div className="flex gap-3">
                    <input
                        ref={nameInputRef}
                        type="text"
                        placeholder="Product name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border rounded p-2 flex-1"
                    />

                    <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="border rounded p-2 w-32"
                    />

                    <button
                        onClick={handleAddProduct}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Add
                    </button>
                </div>
            </div>

            <div className="grid gap-4">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="border rounded-lg p-4 flex justify-between items-center"
                    >
                        <div>
                            <h3 className="font-semibold">
                                {product.name}
                            </h3>

                            <p>${product.price}</p>
                        </div>

                        <button
                            onClick={() => addToCart(product)}
                            className="bg-green-600 text-white px-4 py-2 rounded"
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductsPage;
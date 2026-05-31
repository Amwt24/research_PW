import { useCartStore } from "../store/cartStore";
import { useCartReducer } from "../hooks/useCartReducer";

function CartPage() {
    const { dispatch } = useCartReducer();
    const cart = useCartStore((state) => state.cart);
    const removeFromCart = useCartStore(
        (state) => state.removeFromCart
    );

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const incrementQuantity = useCartStore(
        (state) => state.incrementQuantity
    );

    const decrementQuantity = useCartStore(
        (state) => state.decrementQuantity
    );

    const clearCart = useCartStore(
        (state) => state.clearCart
    );

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">
                Shopping Cart
            </h1>

            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <div className="space-y-4">
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="border rounded-lg p-4 flex justify-between items-center"
                            >
                                <div>
                                    <h3 className="font-semibold">
                                        {item.name}
                                    </h3>

                                    <div className="flex items-center gap-3 mt-2">
                                        <button
                                            onClick={() => {
                                                dispatch({
                                                    type: "DECREMENT",
                                                    payload: item.id,
                                                });

                                                decrementQuantity(item.id);
                                            }}
                                        >
                                            -
                                        </button>

                                        <span>{item.quantity}</span>

                                        <button
                                            onClick={() => {
                                                dispatch({
                                                    type: "INCREMENT",
                                                    payload: item.id,
                                                });

                                                incrementQuantity(item.id);
                                            }}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <button
                                    onClick={() =>
                                        removeFromCart(item.id)
                                    }
                                    className="bg-red-600 text-white px-4 py-2 rounded"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-xl font-bold mt-6">
                        Total: ${total}
                    </h2>
                    <button
                        onClick={clearCart}
                        className="mt-4 bg-red-700 text-white px-4 py-2 rounded"
                    >
                        Clear Cart
                    </button>
                </>
            )}
        </div>
    );
}

export default CartPage;
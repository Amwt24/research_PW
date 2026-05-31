import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Product, CartItem } from "./cartTypes";

interface CartStore {
    cart: CartItem[];

    addToCart: (product: Product) => void;
    removeFromCart: (id: number) => void;

    incrementQuantity: (id: number) => void;
    decrementQuantity: (id: number) => void;

    clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set) => ({
            cart: [],

            addToCart: (product) =>
                set((state) => {
                    const existingItem = state.cart.find(
                        (item) => item.id === product.id
                    );

                    if (existingItem) {
                        return {
                            cart: state.cart.map((item) =>
                                item.id === product.id
                                    ? {
                                        ...item,
                                        quantity: item.quantity + 1,
                                    }
                                    : item
                            ),
                        };
                    }

                    return {
                        cart: [
                            ...state.cart,
                            {
                                ...product,
                                quantity: 1,
                            },
                        ],
                    };
                }),

            removeFromCart: (id) =>
                set((state) => ({
                    cart: state.cart.filter(
                        (item) => item.id !== id
                    ),
                })),

            incrementQuantity: (id) =>
                set((state) => ({
                    cart: state.cart.map((item) =>
                        item.id === id
                            ? {
                                ...item,
                                quantity: item.quantity + 1,
                            }
                            : item
                    ),
                })),

            decrementQuantity: (id) =>
                set((state) => ({
                    cart: state.cart
                        .map((item) =>
                            item.id === id
                                ? {
                                    ...item,
                                    quantity: item.quantity - 1,
                                }
                                : item
                        )
                        .filter((item) => item.quantity > 0),
                })),

            clearCart: () =>
                set({
                    cart: [],
                }),
        }),
        {
            name: "shopping-cart",
        }
    )
);
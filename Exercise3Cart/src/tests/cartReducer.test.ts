import { describe, test, expect } from "@jest/globals";
import {
    cartReducer,
    initialCartState,
} from "../store/cartReducer";

describe("cartReducer", () => {
    test("should add product to cart", () => {
        const state = cartReducer(
            initialCartState,
            {
                type: "ADD_TO_CART",
                payload: {
                    id: 1,
                    name: "Mouse",
                    price: 25,
                },
            }
        );

        expect(state.items.length).toBe(1);
        expect(state.items[0].quantity).toBe(1);
    });

    test("should remove product from cart", () => {
        const stateWithProduct = {
            items: [
                {
                    id: 1,
                    name: "Mouse",
                    price: 25,
                    quantity: 1,
                },
            ],
        };

        const state = cartReducer(
            stateWithProduct,
            {
                type: "REMOVE_FROM_CART",
                payload: 1,
            }
        );

        expect(state.items.length).toBe(0);
    });
});
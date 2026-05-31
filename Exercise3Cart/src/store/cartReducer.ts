import type {
    CartAction,
    CartItem,
    CartState,
} from "./cartTypes";

export const initialCartState: CartState = {
    items: [],
};

export function cartReducer(
    state: CartState,
    action: CartAction
): CartState {
    switch (action.type) {
        case "ADD_TO_CART": {
            const existingItem = state.items.find(
                (item) => item.id === action.payload.id
            );

            if (existingItem) {
                return {
                    items: state.items.map((item) =>
                        item.id === action.payload.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                };
            }

            const newItem: CartItem = {
                ...action.payload,
                quantity: 1,
            };

            return {
                items: [...state.items, newItem],
            };
        }

        case "REMOVE_FROM_CART":
            return {
                items: state.items.filter(
                    (item) => item.id !== action.payload
                ),
            };

        case "INCREMENT":
            return {
                items: state.items.map((item) =>
                    item.id === action.payload
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ),
            };

        case "DECREMENT":
            return {
                items: state.items
                    .map((item) =>
                        item.id === action.payload
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    )
                    .filter((item) => item.quantity > 0),
            };

        case "CLEAR_CART":
            return {
                items: [],
            };

        default:
            return state;
    }
}
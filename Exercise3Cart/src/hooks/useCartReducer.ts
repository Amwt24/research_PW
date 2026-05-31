import { useReducer } from "react";

import {
    cartReducer,
    initialCartState,
} from "../store/cartReducer";

export function useCartReducer() {
    const [state, dispatch] = useReducer(
        cartReducer,
        initialCartState
    );

    return {
        state,
        dispatch,
    };
}
export interface Product {
    id: number;
    name: string;
    price: number;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface CartState {
    items: CartItem[];
}

export type CartAction =
    | { type: "ADD_TO_CART"; payload: Product }
    | { type: "REMOVE_FROM_CART"; payload: number }
    | { type: "INCREMENT"; payload: number }
    | { type: "DECREMENT"; payload: number }
    | { type: "CLEAR_CART" };
# Exercise 3 - Shopping Cart with Persistence

## Overview

Shopping Cart with Persistence is a React application designed to demonstrate modern state management techniques, client-side routing, persistence mechanisms, and React Hooks through the implementation of a functional shopping cart system.

The application allows users to dynamically create products, add them to a shopping cart, manage product quantities, and maintain cart data even after refreshing the browser.

This project focuses on the practical use of React state management solutions and hooks, including:

* Zustand
* useReducer
* useRef

The project also incorporates TypeScript, React Router, Tailwind CSS, and unit testing with Jest.

---

## Objectives

The main goals of this project are:

* Build a functional shopping cart system.
* Manage global state across multiple pages.
* Persist application data between browser sessions.
* Implement complex state logic using reducers.
* Improve user experience with DOM manipulation hooks.
* Apply modern React development practices.
* Implement basic unit testing.

---

## Technologies Used

| Technology   | Purpose                          |
| ------------ | -------------------------------- |
| React        | User Interface Development       |
| TypeScript   | Static Typing                    |
| Tailwind CSS | Styling and Responsive Design    |
| React Router | Client-Side Routing              |
| Zustand      | Global State Management          |
| Jest         | Unit Testing                     |
| useReducer   | Complex State Management         |
| useRef       | DOM References and Focus Control |

---

## Features

### Product Creation

Users can create products dynamically by entering a product name and price.

### Shopping Cart Management

Products can be added to the shopping cart and managed through quantity controls.

### Cart Persistence

Shopping cart data remains available even after refreshing the browser through localStorage persistence.

### Multi-Page Navigation

Users can navigate between the Product Catalog and Shopping Cart pages using React Router.

### Unit Testing

Reducer logic is tested using Jest to verify correct state transitions.

---

## Project Structure

```text
src
│
├── hooks
│   └── useCartReducer.ts
│
├── pages
│   ├── ProductsPage.tsx
│   └── CartPage.tsx
│
├── store
│   ├── cartTypes.ts
│   ├── cartReducer.ts
│   └── cartStore.ts
│
├── tests
│   └── cartReducer.test.ts
│
├── App.tsx
├── main.tsx
└── index.css
```

---

## State Management Technologies Used

### Zustand

Zustand is used to manage the global shopping cart state and share data between pages.

Benefits:

* Minimal boilerplate
* Easy state sharing
* Excellent performance
* Built-in persistence support

Example:

```tsx
const cart = useCartStore(
  (state) => state.cart
);
```

---

### Zustand Persistence

The persist middleware is used to save cart data into localStorage.

Benefits:

* Data survives page refreshes
* Improved user experience
* Automatic state restoration

Example:

```tsx
persist(
  (set) => ({
    cart: []
  }),
  {
    name: "shopping-cart"
  }
);
```

---

## React Hooks Used

### useReducer

Used to manage complex shopping cart operations through actions and a reducer function.

Benefits:

* Centralized business logic
* Predictable state transitions
* Easier testing
* Better maintainability

Actions implemented:

* ADD_TO_CART
* REMOVE_FROM_CART
* INCREMENT
* DECREMENT
* CLEAR_CART

Example:

```tsx
const [state, dispatch] =
  useReducer(
    cartReducer,
    initialCartState
  );
```

Example Action:

```tsx
dispatch({
  type: "ADD_TO_CART",
  payload: product
});
```

---

### useRef

Used to directly reference DOM elements and improve user interaction.

Benefits:

* Direct DOM access
* No unnecessary re-renders
* Better user experience

Application:

After creating a product, the cursor automatically returns to the Product Name input field.

Example:

```tsx
const inputRef =
  useRef<HTMLInputElement>(null);
```

Example Usage:

```tsx
inputRef.current?.focus();
```

---

## React Router Usage

React Router is used to navigate between application pages without reloading the browser.

Routes:

| Route | Description     |
| ----- | --------------- |
| /     | Product Catalog |
| /cart | Shopping Cart   |

Example:

```tsx
<Routes>
  <Route
    path="/"
    element={<ProductsPage />}
  />

  <Route
    path="/cart"
    element={<CartPage />}
  />
</Routes>
```

---

## Shopping Cart Operations

### Add Product to Cart

Users can add products from the catalog into the shopping cart.

### Increment Quantity

Users can increase the quantity of a product already added to the cart.

### Decrement Quantity

Users can decrease the quantity of a product.

### Remove Product

Users can completely remove a product from the shopping cart.

### Clear Cart

Users can remove all products from the shopping cart with a single action.

### Calculate Total

The application automatically calculates the total cart value.

Example:

```tsx
const total = cart.reduce(
  (sum, item) =>
    sum + item.price * item.quantity,
  0
);
```

---

## Installation

Clone the repository:

```bash
git clone <https://github.com/Amwt24/research_PW.git>
```

Navigate to the project folder:

```bash
cd Exercise3Cart
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

---

## Running Tests

Execute all unit tests:

```bash
npm test
```

Expected result:

```text
PASS src/tests/cartReducer.test.ts

✓ should add product to cart
✓ should remove product from cart
```

---

## Learning Outcomes

Through this project, the following concepts were practiced:

* React Component Architecture
* TypeScript Integration
* State Management with Zustand
* Persistence using localStorage
* React Router Navigation
* Reducer-Based State Management
* DOM Manipulation with useRef
* Tailwind CSS Layout Design
* Unit Testing with Jest
* Separation of Concerns

---

## Conclusion

This project demonstrates how modern React applications can efficiently manage shared state, persist user data, and maintain clean application architecture.

By combining Zustand, useReducer, useRef, React Router, Tailwind CSS, TypeScript, and Jest, the application provides a scalable, maintainable, and user-friendly shopping cart experience. The project also serves as a practical example of how state management and persistence strategies can be applied in real-world frontend development scenarios.

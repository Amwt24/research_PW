# Exercise 4 - High Performance Product Search

## Overview

High Performance Product Search is a React application designed to demonstrate modern React performance optimization techniques when working with large datasets.

The application simulates a catalog containing thousands of products and allows users to search efficiently while maintaining a smooth and responsive user experience.

This project focuses on the practical use of React Performance Hooks, including:

* useTransition
* useDeferredValue
* useMemo
* useId

The project also incorporates TypeScript, React Router, Tailwind CSS, and unit testing with Vitest.

---

## Objectives

The main goals of this project are:

* Build a responsive product search interface.
* Optimize expensive filtering operations.
* Improve user experience during search interactions.
* Apply React performance optimization hooks.
* Follow a clean and scalable project architecture.
* Implement basic unit testing.

---

## Technologies Used

| Technology       | Purpose                       |
| ---------------- | ----------------------------- |
| React            | User Interface Development    |
| TypeScript       | Static Typing                 |
| Tailwind CSS     | Styling and Responsive Design |
| React Router     | Client-Side Routing           |
| Vitest           | Unit Testing                  |
| useTransition    | Non-Urgent State Updates      |
| useDeferredValue | Deferred Search Processing    |
| useMemo          | Memoized Calculations         |
| useId            | Accessibility Improvements    |

---

## Features

### Product Search

Users can search through a large collection of products using a responsive search field.

### Performance Optimization

The application remains responsive even while filtering thousands of products.

### Accessible Forms

The search input is properly associated with its label using React's useId hook.

### Responsive Layout

The interface adapts to different screen sizes using Tailwind CSS.

### Unit Testing

Filtering logic is tested using Vitest to ensure correct functionality.

---

## Project Structure

```text
src
│
├── components
│   ├── LoadingIndicator.tsx
│   ├── ProductCard.tsx
│   ├── ProductList.tsx
│   └── SearchInput.tsx
│
├── hooks
│   └── useProductSearch.ts
│
├── pages
│   ├── HomePage.tsx
│   └── ProductsPage.tsx
│
├── router
│   └── AppRouter.tsx
│
├── store
│   ├── productTypes.ts
│   ├── productsData.ts
│   └── filterProducts.ts
│
├── tests
│   └── useProductSearch.test.ts
│
├── App.tsx
├── main.tsx
└── index.css
```

---

## React Performance Hooks Used

### useTransition

Used to mark search updates as non-urgent.

Benefits:

* Prevents UI blocking
* Improves typing responsiveness
* Prioritizes user interactions

Example:

```tsx
startTransition(() => {
  setSearchTerm(value);
});
```

---

### useDeferredValue

Used to defer expensive filtering operations.

Benefits:

* Reduces unnecessary recalculations
* Improves rendering performance
* Provides smoother user experience

Example:

```tsx
const deferredSearchTerm =
  useDeferredValue(searchTerm);
```

---

### useMemo

Used to memoize product filtering calculations.

Benefits:

* Avoids repeated computations
* Improves efficiency
* Enhances scalability

Example:

```tsx
const filteredProducts = useMemo(() => {
  return filterProducts(
    products,
    deferredSearchTerm
  );
}, [deferredSearchTerm]);
```

---

### useId

Used to generate unique identifiers for form accessibility.

Benefits:

* Better accessibility
* Proper label-input association
* Unique IDs without manual creation

Example:

```tsx
const inputId = useId();
```

---

## Installation

Clone the repository:

```bash
git clone <https://github.com/Amwt24/research_PW.git>
```

Navigate to the project folder:

```bash
cd Exercise4Research
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
npm run test
```

Expected result:

```text
✓ Test Files 1 passed
✓ Tests 3 passed
```

---

## Learning Outcomes

Through this project, the following concepts were practiced:

* React Component Architecture
* TypeScript Integration
* React Router Navigation
* Tailwind CSS Layout Design
* React Performance Optimization
* Accessibility Best Practices
* Custom Hooks Development
* Unit Testing with Vitest
* Separation of Concerns

---

## Conclusion

This project demonstrates how modern React applications can efficiently handle large datasets while maintaining excellent user experience.

By combining useTransition, useDeferredValue, useMemo, and useId, the application remains responsive, accessible, and scalable. The use of TypeScript, Tailwind CSS, React Router, and Vitest further contributes to a clean, maintainable, and professional development environment.

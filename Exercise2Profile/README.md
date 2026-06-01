# Exercise 2 - Real-Time Profile Editor

## Overview

Real-Time Profile Editor is a React application designed to demonstrate modern form validation, external native state management, strict typing, and synchronous DOM manipulation through the implementation of an interactive user profile system.

The application allows users to dynamically edit their profile information, validates the data in real-time using schemas, synchronizes it automatically with browser storage without explicit "Save" buttons, and features a Premium "Glassmorphism" design with synchronous visual effects.

This project focuses on the practical use of form libraries, schema validation, and advanced React hooks, including:

* Formik
* Zod
* useSyncExternalStore
* useLayoutEffect

The project also incorporates TypeScript, Material UI (MUI), Vite, and unit testing with Vitest and React Testing Library.

---

## Objectives

The main goals of this project are:

* Build a highly interactive and strictly typed profile editing form.
* Manage and persist state entirely outside of React using Vanilla JS stores.
* Implement declarative, real-time input validation.
* Read and manipulate DOM dimensions synchronously before browser paints.
* Apply modern Premium Design aesthetics (Glassmorphism).
* Implement integration testing for form behavior.

---

## Technologies Used

| Technology             | Purpose                                      |
| ---------------------- | -------------------------------------------- |
| React                  | User Interface Development                   |
| TypeScript             | Static Typing and Interface Contracts        |
| Material UI (MUI)      | Styling, Premium Design, and Layout          |
| Formik                 | Form State and Event Management              |
| Zod                    | Schema Declaration and Runtime Validation    |
| Vitest & RTL           | Unit and Integration Testing                 |
| useSyncExternalStore   | Native External Store Synchronization        |
| useLayoutEffect        | Synchronous DOM Measurement and Manipulation |

---

## Features

### Profile Editing
Users can edit their personal data (Name, Email, Biography) dynamically.

### Real-Time Validation
All fields are strictly validated on-the-fly (`onBlur` and `onChange`) against robust logical rules to prevent invalid data entry.

### Auto-Save Persistence
Data is automatically saved in real-time to the browser's `localStorage` via a native Vanilla JS store, bypassing the need for manual submissions.

### Dynamic Avatar Glow
The Avatar component calculates the length of the biography in real-time and synchronously adjusts its padding and glow intensity based on a 200-character limit constraint.

### Premium Design
The UI leverages modern "Glassmorphism" (frosted glass) effects, gradient backgrounds, and responsive centering for an immersive experience.

### Unit Testing
Zod schema rules and Formik validation integration are tested using React Testing Library to ensure visual error feedback behaves as expected.

---

## Project Structure

```text
src
│
├── components
│   └── ProfileEditor.tsx
│
├── schemas
│   └── profileSchema.ts
│
├── store
│   └── profileStore.ts
│
├── theme
│   └── theme.ts
│
├── __tests__
│   └── ProfileEditor.test.tsx
│
├── App.tsx
├── main.tsx
├── index.css
└── setupTests.ts
```

---

## Form Validation Technologies Used

### Formik

Formik is used to manage the form's local state, handle user input events, and track visited fields (`touched`).

Benefits:

* Centralizes state management for inputs
* Handles blur and change events automatically
* Eliminates massive `useState` declarations
* Improves UX by avoiding premature error warnings

Example:

```tsx
const formik = useFormik<ProfileData>({
  initialValues: storeData,
  validate: myValidationLogic,
});
```

---

### Zod

Zod is used to define the data schema and execute safe parsing to guarantee data integrity before it reaches the store.

Benefits:

* Single source of truth for types and validation rules
* Extremely readable declarative syntax
* `safeParse` prevents application crashes on invalid data

Example:

```tsx
export const profileSchema = z.object({
  email: z.string().email('Invalid email address'),
});
```

---

## React Hooks Used

### useSyncExternalStore

Used to subscribe React safely to a Vanilla JS global store that handles the `localStorage` persistence, avoiding concurrent rendering issues.

Benefits:

* Decouples business logic from the React component tree
* Prevents visual tearing
* Automatic state restoration on page load

Example:

```tsx
const storeData = useSyncExternalStore(
  profileStore.subscribe,
  profileStore.getSnapshot
);
```

---

### useLayoutEffect

Used to synchronously measure the `bio` field length and adjust the physical dimensions and visual effects of the Avatar container before the browser paints.

Benefits:

* Immediate visual updates without flickering
* Perfect for animations tied to DOM layout calculations
* Forces a synchronous micro-render

Application:

As the user types in the biography field, the purple glow radius around the Avatar expands proportionally to the character limit.

Example:

```tsx
useLayoutEffect(() => {
  const bioLength = formik.values.bio.length;
  // Synchronous DOM calculations...
  setAvatarGlow(bioLength * multiplier);
}, [formik.values.bio]);
```

---

## Profile Editor Operations

### Update Name and Email
Users enter their standard identification fields, validating standard string limits and regex email patterns.

### Edit Biography
A multiline text area where users input longer descriptions, constrained to a maximum of 200 characters.

### Instant Validation Feedback
Upon leaving a field with invalid data, an error message is instantly rendered beneath the respective input using MUI components.

### Progress Indicator
The visual intensity of the Avatar indicates how close the user is to the biography character limit.

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Amwt24/research_PW.git
```

Navigate to the project folder:

```bash
cd Exercise2Profile
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

Execute all unit and integration tests:

```bash
npm test
```

Expected result:

```text
PASS src/__tests__/ProfileEditor.test.tsx

✓ should render without crashing
✓ should display validation errors for invalid email
✓ should auto-save input changes
```

---

## Learning Outcomes

Through this project, the following concepts were practiced:

* Premium Design & Glassmorphism Implementation
* Advanced Form State Management with Formik
* Runtime Type Validation with Zod
* Native External Store Architecture (`useSyncExternalStore`)
* Synchronous DOM Manipulation (`useLayoutEffect`)
* Vanilla JS pattern integration within React
* Unit Testing Form Behaviors
* Separation of Concerns

---

## Conclusion

This project demonstrates how modern React applications can achieve extreme decoupling between user interfaces, form state management, and data persistence.

By combining Formik, Zod, native Vanilla JS stores, `useSyncExternalStore`, and `useLayoutEffect`, the application guarantees safe data entry, real-time persistence without submit buttons, and seamless visual synchronization. The project serves as a practical example of how advanced React hooks and schema validation libraries resolve real-world complexities regarding robust form handling and glitch-free user experiences.

---

## References

- Microsoft. (2026). *TypeScript Handbook: Advanced Type Inference and Schema Derivation*. Retrieved from https://www.typescriptlang.org/docs/
- Meta Platforms Inc. (2026). *React Reference Docs: Synchronous Hooks (`useLayoutEffect` & `useSyncExternalStore`)*. Retrieved from https://react.dev/reference/react
- Palmer, J. / Formik Contributors. (2026). *Formik Form Context and Unified Control Reference Guide*. Retrieved from https://formik.org/docs/overview
- Kaplan, C. / Zod Authors. (2026). *Zod API Reference: Strict Parsing and Validation Semantics*. Retrieved from https://zod.dev/
- MUI. (2026). *Material UI Core: Style System and Form Validation Visual Standards*. Retrieved from https://mui.com/material-ui/getting-started/
- Testing Library Contributors. (2026). *React Testing Library: User-Centric DOM Assertions*. Retrieved from https://testing-library.com/docs/react-testing-library/intro/
- Vitest Dev. (2026). *Vitest ESM Native Test Runner Guide*. Retrieved from https://vitest.dev/guide/
- Vite Development Team. (2026). *Vite Core Tooling Philosophy and HMR Benchmarks*. Retrieved from https://vite.dev/guide/

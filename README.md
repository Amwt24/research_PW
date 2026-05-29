# research_PW

This repository is a research project on tools for using and managing React.

## Branches
- `main`
- `kevin`
- `amawta`
- `antony`

## Antony: Focus on Data Management and Complex UI
**Key Tools:** Material UI, TanStack Query, React Testing Library.

**Assigned Hooks:** useMemo, useCallback, useLayoutEffect, useInsertionEffect, useSyncExternalStore.

### Exercise 1: Administration Dashboard with Caching
**Context:** Create a user table that retrieves data from an API.

**Tech Stack:** Material UI, TanStack Query, useMemo (for filtering data), useCallback (for sorting functions).

### Exercise 2: Profile Editor with Real-Time Validation
**Context:** Editing form with persistence.

**Tech Stack:** Material UI, Formik, Zod, useLayoutEffect (for adjusting DOM measures), useSyncExternalStore (to sync with an external store).

## Kevin: Focus on State, Flows, and Functional UI
**Key Tools:** Tailwind CSS, Zustand, React Router, Jest.

**Assigned Hooks:** useReducer, useRef, useId, useTransition, useDeferredValue.

### Exercise 3: Shopping Cart with Persistence
**Context:** A store system where the cart state persists across pages.

**Tech Stack:** Tailwind CSS, Zustand, React Router, useReducer (for complex cart logic), useRef (for focusing inputs).

### Exercise 4: High-Performance Product Search
**Context:** Filtering a long list of items.

**Tech Stack:** Tailwind CSS, React Router, useTransition and useDeferredValue (to avoid UI blocking during search), useId (for accessibility in inputs).

## Amawta: Focus on Advanced Hooks, Forms, and Quality
**Key Tools:** Chakra UI, React Hook Form, Cypress, Toolkit.

**Assigned Hooks:** useState, useEffect, useContext, useActionState, useFormStatus, useOptimistic, useDebugValue.

### Exercise 5: Complete Authentication System
**Context:** Registration and Login with error handling and global state.

**Tech Stack:** Chakra UI, React Hook Form, Zod, useState, useEffect, useContext (for authentication), useActionState, useFormStatus, and useOptimistic (for optimistic load states).

### Exercise 6: State Debugging Panel
**Context:** Create a small debugging component that displays the state of an application.

**Tech Stack:** Chakra UI, Toolkit, useDebugValue (to create custom hooks that are displayed in React DevTools), Cypress (for end-to-end testing of the application flow).

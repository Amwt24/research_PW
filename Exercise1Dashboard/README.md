# Exercise 1 - Admin Dashboard with Cache

## Overview

Admin Dashboard with Cache is a React application designed to demonstrate modern server-state management techniques, client-side caching mechanisms, and performance optimization through React Hooks via the implementation of a functional user dashboard system.

The application allows users to fetch a dataset of users from an external API, dynamically filter them by name, and sort the results, all while maintaining excellent performance and avoiding unnecessary network requests or component re-renders.

This project focuses on the practical use of React state management solutions and optimization hooks, including:

* TanStack Query (React Query)
* useMemo
* useCallback

The project also incorporates TypeScript, Material UI (MUI), Vite, and unit testing with Vitest and React Testing Library.

---

## Objectives

The main goals of this project are:

* Build a functional data-driven dashboard system.
* Manage asynchronous server state and caching automatically.
* Optimize client-side data transformations (filtering and sorting).
* Prevent unnecessary re-renders using memoization hooks.
* Apply modern React development practices and static typing.
* Implement integration and unit testing targeting user behavior.

---

## Technologies Used

| Technology             | Purpose                                      |
| ---------------------- | -------------------------------------------- |
| React                  | User Interface Development                   |
| TypeScript             | Static Typing and Data Contracts             |
| Material UI (MUI)      | Styling, Layout, and Component Library       |
| TanStack Query         | Server State Management and Data Caching     |
| Vitest & RTL           | Unit and Integration Testing                 |
| useMemo                | Heavy Computation & Data Filtering Optimizer |
| useCallback            | Function Reference Stabilization             |

---

## Features

### Automated Data Fetching
Users can view a list of users fetched dynamically from an external API, with loading and error states handled seamlessly.

### Smart Data Caching
Fetched data is stored in a global cache (`stale-while-revalidate`), preventing redundant network requests when components remount.

### Client-Side Filtering
Users can search for specific users by name. The list updates instantly based on the search query without refetching the API.

### Dynamic Sorting
Data can be ordered ascending or descending by different columns, keeping the UI responsive.

### Performance Optimization
Filtering and sorting logic is protected by memoization hooks, preventing expensive recalculations during unrelated state changes.

### Unit Testing
Component behavior, including API mocking and visual accessibility, is validated using React Testing Library and Vitest.

---

## Project Structure

```text
src
│
├── api
│   └── userApi.ts
│
├── components
│   ├── Dashboard.tsx
│   ├── UserTable.tsx
│   └── SearchBar.tsx
│
├── hooks
│   └── useUsers.ts
│
├── __tests__
│   ├── Dashboard.test.tsx
│   └── UserTable.test.tsx
│
├── App.tsx
├── main.tsx
└── index.css
```

---

## State Management Technologies Used

### TanStack Query

TanStack Query is used to fetch, cache, and synchronize the external user data, completely removing the need for manual `useEffect` and `useState` for network calls.

Benefits:

* Minimal boilerplate
* Automatic caching and memory garbage collection
* Stale-while-revalidate strategies
* Built-in loading and error states

Example:

```tsx
const { data, isLoading, isError } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
  staleTime: 1000 * 60 * 5
});
```

---

## React Hooks Used

### useMemo

Used to cache the result of the filtering and sorting operations. The data is only re-calculated when the user dataset, the search term, or the sorting order changes.

Benefits:

* Prevents UI slowdowns during keystrokes
* Reduces CPU cycles by skipping unnecessary loops
* Better scalability for large datasets

Example:

```tsx
const filteredUsers = useMemo(() => {
  return users.filter((user) => 
    user.name.toLowerCase().includes(search.toLowerCase())
  );
}, [users, search]);
```

---

### useCallback

Used to maintain the referential identity of event handler functions, specifically the sorting toggles passed down to child table components.

Benefits:

* Prevents unnecessary re-renders of optimized child components
* Stabilizes callbacks used as dependencies elsewhere
* Better memory management

Example:

```tsx
const handleToggleSort = useCallback(() => {
  setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
}, []);
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Amwt24/research_PW.git
```

Navigate to the project folder:

```bash
cd Exercise1Dashboard
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
PASS src/__tests__/Dashboard.test.tsx
PASS src/__tests__/UserTable.test.tsx

✓ should render the dashboard title correctly
✓ should display loading state initially
✓ should filter users based on search input
```

---

## Learning Outcomes

Through this project, the following concepts were practiced:

* React Component Architecture
* TypeScript Integration and Interface Contracts
* Server-State Management with TanStack Query
* Advanced Caching Strategies
* Performance Optimization using `useMemo` and `useCallback`
* Material UI Component Integration and Theming
* Unit Testing with Vitest and React Testing Library
* Vite Build Tool Configuration

---

## Conclusion

This project demonstrates how modern React applications can efficiently manage asynchronous server data, optimize expensive client-side transformations, and maintain clean component architecture.

By combining TanStack Query, `useMemo`, `useCallback`, Material UI, TypeScript, and Vitest, the application provides a highly performant, scalable, and user-friendly administrative dashboard. The project serves as a practical example of how optimization hooks and server-state managers resolve the historical complexities of data fetching and rendering bottlenecks in frontend development.

---

## References

1. **Microsoft.** (2026). *TypeScript Documentation*. Retrieved from https://www.typescriptlang.org/docs/
2. **Meta Platforms Inc.** (2026). *React Reference Hooks: useMemo, useCallback*. Retrieved from https://react.dev/reference/react
3. **Material UI.** (2026). *MUI Components & Grid Guide*. Retrieved from https://mui.com/material-ui/getting-started/
4. **Hooks, T.** (2026). *TanStack Query v5 Overview and Caching Strategies*. Retrieved from https://tanstack.com/query/latest/docs/framework/react/overview
5. **Testing Library Contributors.** (2026). *React Testing Library API Reference*. Retrieved from https://testing-library.com/docs/react-testing-library/intro/
6. **Vitest Dev.** (2026). *Vitest Guide and API Configuration*. Retrieved from https://vitest.dev/guide/
7. **Context, Y.** (2026). *Vite Guide: Philosophy and Benchmarks*. Retrieved from https://vite.dev/guide/

# Advanced React Hooks, Forms, and Quality Projects

This repository contains two projects designed to demonstrate clean code practices, modern TypeScript architectures, and the application of advanced React 19 hooks and quality tools. Both projects are built using **Chakra UI v3** for premium, modern, responsive aesthetics.

---

## Directory Structure

```
research_PW/
├── exercise-5-auth-system/      # Complete Authentication System
│   ├── src/
│   │   ├── components/         # SubmitButton, LoginForm, RegisterForm, Dashboard
│   │   │   └── ui/             # Chakra v3 components (Alert, Field, Toaster, etc.)
│   │   ├── context/            # AuthContext (global state with localStorage cache)
│   │   ├── hooks/              # useAuth custom context hook
│   │   ├── schemas/            # Zod validation schemas
│   │   ├── App.tsx             # Auth view router and main layout
│   │   └── main.tsx            # Providers wrapper root
│   ├── Dockerfile
│   └── package.json
│
├── exercise-6-debugging-panel/   # State Debugging Panel
│   ├── src/
│   │   ├── components/         # TaskForm, TaskList, DebugPanel
│   │   ├── store/              # Redux Toolkit setup and taskSlice
│   │   ├── hooks/              # useDebuggableState (useDebugValue integration)
│   │   └── App.tsx             # Side-by-side app layout
│   ├── cypress/
│   │   └── e2e/                # E2E test specs verifying state transitions
│   ├── cypress.config.ts
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml           # Root-level multi-container orchestrator
└── README.md                    # Main documentation file (this file)
```

---

## Technical Stack & Advanced Hooks

### Exercise 5: Complete Authentication System (Port 3000)
A complete login and registration system featuring:
*   **Form Validation**: Leverages **React Hook Form** integrated with **Zod** schema validations to validate inputs (e.g. valid email syntax, minimum password lengths, matching passwords) client-side before any dispatch events occur.
*   **`useActionState`**: Custom Form action logic that binds submission forms to an asynchronous function. It receives errors and validation changes from simulated network calls to update login failure/success alerts in the UI.
*   **`useFormStatus`**: Consumed by a child `<SubmitButton>` component inside `<form>` elements. It dynamically detects pending status during asynchronous database actions to automatically render loading states and disable buttons.
*   **`useOptimistic`**: Employed in the `UserDashboard`. When updating user biography information, the dashboard uses `useOptimistic` to immediately display the updated text in the profile header before the mock database confirms saving.

### Exercise 6: State Debugging Panel (Port 3001)
A task manager application managed by Redux Toolkit, showing state metrics directly inside browser interfaces and React Developer Tools:
*   **Global State (Redux Toolkit)**: Manages tasks and filters. Additionally, it logs a transaction ledger recording action dispatches (e.g. `tasks/addTask`, `tasks/deleteTask`, `tasks/updateTaskStatus`).
*   **`useDebugValue`**: Incorporated inside the custom hook `useDebuggableState`. It formats and exposes the current Redux store length, number of pending tasks, and recent action records to the **React Developer Tools** extension under the components inspector.
*   **Debug Panel**: Rendered on-screen side-by-side with the Task App. It features raw state JSON previewing alongside a chronological dispatch feed of action payloads.
*   **E2E Testing (Cypress)**: An automated E2E test suite that runs Cypress tests against user interactions, asserting that dispatches update the state visualizer and logs correctly.

---

## Getting Started

You can run both projects simultaneously using **Docker Compose** or boot them up manually in separate terminals.

### Method 1: Running with Docker Compose (Recommended)

1.  **Prerequisites**: Ensure Docker and Docker Compose are installed on your machine.
2.  **Spin up containers**: From the root directory (`research_PW/`), execute:
    ```bash
    docker-compose up --build
    ```
3.  **Access the applications**:
    *   **Exercise 5 (Auth System)**: Access at [http://localhost:3000](http://localhost:3000)
    *   **Exercise 6 (Debug Panel)**: Access at [http://localhost:3001](http://localhost:3001)
4.  **Stop containers**:
    ```bash
    docker-compose down
    ```

---

### Method 2: Manual Local Execution

Ensure you have **Node.js (v20+)** installed.

#### Running Exercise 5 (Authentication System)
1.  Navigate to the directory:
    ```bash
    cd exercise-5-auth-system
    ```
2.  Install packages:
    ```bash
    npm install
    ```
3.  Boot development server:
    ```bash
    npm run dev
    ```
4.  Access the app at the URL printed in the terminal (defaults to [http://localhost:3000](http://localhost:3000)).

#### Running Exercise 6 (State Debugging Panel)
1.  Navigate to the directory:
    ```bash
    cd exercise-6-debugging-panel
    ```
2.  Install packages:
    ```bash
    npm install
    ```
3.  Boot development server:
    ```bash
    npm run dev
    ```
4.  Access the app at the URL printed in the terminal (defaults to [http://localhost:3001](http://localhost:3001)).

---

## Running E2E Cypress Tests (Exercise 6)

Cypress tests are configured inside `exercise-6-debugging-panel`. To run them locally:

1.  Start the application server locally in `exercise-6-debugging-panel` using:
    ```bash
    npm run dev
    ```
2.  Open another terminal inside the `exercise-6-debugging-panel` directory and execute one of the following commands:
    *   **Headless execution**:
        ```bash
        npm run cy:run
        ```
        This runs the test suites inside a headless electron browser and outputs a terminal report.
    *   **Interactive execution (GUI)**:
        ```bash
        npm run cy:open
        ```
        This boots the Cypress Test Runner panel, allowing you to select and inspect the test suite execution.

---

## Clean Code & Architecture Highlights

*   **Verbatim TypeScript Imports**: Explicit declarations using `import type` for schemas and store type signatures to align with compiler assertions.
*   **Separation of Concerns**: Distinct boundaries between business logic (Redux Toolkit slices, Context Providers), representation (layout elements), and schema validations (Zod schemas).
*   **Modular Component Compositions**: Clean React code focusing on reusable inputs, wrapping styles inside custom containers, and standardizing typography structures.

# Employee Management — Project Documentation

> Generated: 2026-07-28
>
> Purpose: Complete project documentation for the React + Vite + Tailwind project. This file is read-only documentation and does not modify source code.

---

**Table of contents**

1. Project Overview
2. Complete Folder Structure
3. File-by-File Documentation (src)
4. Component Flow Diagram
5. State Flow
6. API Documentation
7. CRUD Flow
8. Event Flow
9. Routing Documentation
10. Dependency Graph
11. Safe Modification Guide
12. Code Ownership Map
13. Line Number Reference (key functions)
14. Future Development Guide
15. Common Mistakes
16. Change Impact Analysis
17. Best Practices

---

## 1. Project Overview

- Purpose of the application
  - A simple HR/Employee Management single-page application (SPA) that lists employees, supports search, filtering, sorting and provides CRUD operations (Add, Edit, Delete) for employee records.
  - It is intended as an admin-facing dashboard for managing employees.

- Architecture
  - Client-side single-page application (SPA) built with React (via Vite). UI uses Tailwind CSS and icons from `lucide-react`.
  - HTTP API calls are performed using `axios` through a small `api` wrapper in `src/services/api.js`.
  - Mock backend expected: `json-server` serving `db.json` on `http://localhost:5000` (development).
  - Component-driven architecture with a `MainLayout` containing header/sidebar, pages for `Dashboard` and `Login`, and small reusable components (Table, Modal, Loader, Empty/Error states).

- Folder structure (short):
  - `src/` — application source
  - `src/components/` — UI components
  - `src/pages/` — page-level containers (Dashboard, Login)
  - `src/layout/` — `MainLayout`
  - `src/context/` — authentication context
  - `src/hooks/` — custom hooks (useAuth)
  - `src/services/` — HTTP service wrappers and API-level services
  - `src/utils/` — helpers (employee filtering, pagination, date formatting, tests)

- Technologies used
  - React (JSX) with modern hooks
  - Vite as the build/dev server
  - Tailwind CSS for styling
  - Axios for HTTP
  - react-hot-toast for user toasts
  - json-server for local dev mock backend (not included in package.json but commonly used)
  - Vitest for tests

- Third-party libraries (observed)
  - axios
  - react-hot-toast
  - lucide-react (icons)
  - vitest (test runner)

- State management approach
  - Local React component state + context for auth. No global state manager (no Redux, Zustand, etc.). Employee list state is kept in `DashboardPage.jsx`.

- Routing approach
  - React Router v6/v7 style with `createBrowserRouter` and a `RouterProvider` configured in `src/routes/index.jsx`.
  - Route protection via `ProtectedRoute.jsx` and `AuthContext`.

---

## 2. Complete Folder Structure

This section explains each top-level folder in `src` and their responsibilities.

- `src/`
  - Purpose: application source root.
  - Contains styles, entry point, components, pages, services, hooks, context, utils.

- `src/components/`
  - Purpose: Reusable UI components used by pages.
  - Files and responsibilities:
    - `AnalyticsSection.jsx` — Small charts/cards that show department or other metrics (visual summaries). Used on Dashboard top region.
    - `DeleteConfirmationModal.jsx` — Confirmation modal used before deleting an employee. Uses `isDeleting` prop to display deleting state.
    - `EmployeeFormModal.jsx` — Add / Edit employee form inside a modal. Handles form state, validation, and submission.
    - `EmployeeTable.jsx` — Renders the employees list as a table (desktop) and cards (mobile). Emits `onEdit` and `onDelete` callbacks.
    - `EmptyState.jsx` — UI shown when the employee list is empty (no results).
    - `ErrorState.jsx` — Error component that displays fetch error and retry option.
    - `Loader.jsx` — Small reusable loading spinner component.

- `src/constants/`
  - Purpose: Small static constants used in the UI.
  - Files:
    - `ui.js` — UI constant values (if present: e.g., colors, page sizes).

- `src/context/`
  - Purpose: Context providers for global concerns.
  - Files:
    - `AuthContext.jsx` — Provides authentication state and actions (`login`, `logout`, token storage) to the app.

- `src/hooks/`
  - Purpose: Custom hooks encapsulating reusable logic.
  - Files:
    - `useAuth.js` — Hook wrapper to access `AuthContext` helpers (login, logout, user info).

- `src/layout/`
  - Purpose: Page layout that wraps routes with header/side navigation.
  - Files:
    - `MainLayout.jsx` — Renders sidebar, header, logout button, and an outlet for pages.

- `src/pages/`
  - Purpose: Top-level routable pages.
  - Files:
    - `DashboardPage.jsx` — Main employee listing page. Holds `employees` state and implements filtering, sorting, pagination, and CRUD handlers.
    - `LoginPage.jsx` — Login page providing credentials and `login` flow.

- `src/routes/`
  - Purpose: Router configuration and route protections.
  - Files:
    - `index.jsx` — Defines route table and binds `RouterProvider`.
    - `ProtectedRoute.jsx` — A wrapper route that checks authentication and either renders children or redirects to login.

- `src/services/`
  - Purpose: HTTP communication and service-level functions.
  - Files:
    - `api.js` — Axios instance configured with baseURL and auth token interceptor.
    - `authService.js` — Authentication related API calls (login). Returns tokens / user info.
    - `employeeService.js` — CRUD API calls for employees: `list`, `create`, `update`, `remove` (DELETE).

- `src/utils/`
  - Purpose: Helper functions and utilities used across the app.
  - Files:
    - `employeeUtils.js` — Filtering, sorting, pagination helpers and `EMPLOYEE_DEPARTMENTS`/`EMPLOYEE_STATUSES` constants, plus small `formatDate` helper.
    - `employeeUtils.test.js` — Unit tests for the `employeeUtils` helpers.
    - `toastHelper.js` — small wrapper for `react-hot-toast` providing consistent durations and optional instrumentation (added during debugging).

- `src/assets/`
  - Purpose: Images and static assets used by the UI (icons or images referenced by components).

- `src/styles/` (if present; in this project styles are inline via Tailwind and `index.css`)
  - Purpose: Global CSS and Tailwind imports.
  - Files:
    - `main.css` / `index.css` (or similar) — global styles and Tailwind directives.

---

## 3. File-by-File Documentation (src)

Note: The goal here is to document every file inside `src`. For each file we give purpose, imports, exports, state used, props, functions, API calls, dependencies, components used, who imports this file, what breaks if modified, recommended/unsafe/safe changes.

> Implementation note: line numbers are approximate and may change as code evolves.

### `src/main.jsx`

Purpose
- Application entry point. Renders `App` into `#root` and sets up global providers if necessary.

Imports
- React, ReactDOM, `App` component, global CSS.

Exports
- None (application mount file).

State used
- N/A (entry script).

Props
- N/A.

Functions
- Bootstraps React render.

API calls
- N/A.

Dependencies
- `App.jsx`, styles.

Components used
- `App`.

Who imports this file
- Bundler / HTML references `src/main.jsx`.

What will break if modified
- App may not boot. Changes here can prevent the whole app from mounting.

Recommended changes
- Avoid changes unless adjusting root providers. Keep minimal.

Unsafe changes
- Replacing the render target id or removing providers.

Safe changes
- Adding error boundaries or performance measuring wrappers.

---

### `src/App.jsx`

Purpose
- Root component that provides `AuthProvider` and `Toaster` for toast notifications and mounts the router via `RouterProvider`.

Imports
- `RouterProvider` from react-router-dom, `Toaster` from react-hot-toast, `AuthProvider` from `src/context/AuthContext`, `router` from `src/routes`, global `App.css`.

Exports
- Default export `App` component.

State used
- None internally (stateless wrapper), though temporary instrumentation may add runtime listeners.

Props
- None.

Functions
- `App()` returns the JSX tree.

API calls
- None.

Dependencies
- `AuthContext.jsx`, `routes/index.jsx`, `react-hot-toast`.

Components used
- `RouterProvider`, `Toaster`.

Who imports this file
- `src/main.jsx`.

What will break if modified
- Router or global providers not mounted; toasts may not show.

Recommended changes
- Keep `Toaster` config consistent. Avoid moving RouterProvider out unless shifting providers.

Unsafe changes
- Removing `AuthProvider` or `RouterProvider` will break routing and auth state.

Safe changes
- Adjusting `Toaster` style/duration to align with UX requirements.

---

### `src/components/EmployeeFormModal.jsx`

Purpose
- Modal used for both Add and Edit Employee operations. Handles form state, validation, submits payload via `onSubmit` prop given by parent.

Imports
- React hooks: `useState`, `useEffect`, `useRef`, memo; `toast` from `react-hot-toast`; `X` icon from `lucide-react`; `EMPLOYEE_DEPARTMENTS` constant from `employeeUtils`.

Exports
- Default: memoized `EmployeeFormModal`.

State used
- `form` — local object with fields: `name`, `email`, `department`, `designation`, `status`, `joiningDate`.
- `errors` — object storing per-field validation messages.

Props
- `employee` — existing employee object for edit; when present modal is in edit mode.
- `isOpen` — boolean whether modal is shown.
- `isSubmitting` — boolean used to disable submit button while the parent is processing.
- `onClose` — function to close the modal.
- `onSubmit` — function called with cleaned payload when user saves.
- `existingEmails` — helper array to validate duplicate emails.

Functions
- `validate()` — returns `nextErrors` object for current `form`.
- `handleFieldChange(field, value)` — updates `form` and clears related `errors`.
- `handleSubmit(event)` — prevents default, validates, optionally shows a toast error, and calls `onSubmit` with trimmed payload when valid.

API calls
- None directly. Parent `DashboardPage` handles actual API calls.

Dependencies
- `employeeUtils` constants; `react-hot-toast` for error messages; parent `DashboardPage`.

Components used
- None internal besides markup; uses `X` icon.

Who imports this file
- `src/pages/DashboardPage.jsx`.

What will break if modified
- Form validation or submission behavior could break add/edit flows.

Recommended changes
- Keep form validation behavior consistent; do not add page reloads.

Unsafe changes
- Removing `event.preventDefault()` or `stopPropagation()` in `handleSubmit`.

Safe changes
- Small UX improvements like extra validation messages or aria attributes.

---

### `src/components/EmployeeTable.jsx`

Purpose
- Presents employee list in responsive table (desktop) and stacked cards (mobile). Delegates Edit/Delete actions via callbacks.

Imports
- React `memo`, icons `Edit3`, `Trash2` from `lucide-react`, `formatDate` helper from `employeeUtils`.

Exports
- Default memoized `EmployeeTable`.

State used
- None (stateless). Receives `employees` via props.

Props
- `employees` — array of employee objects to render.
- `onEdit(employee)` — callback when Edit action is triggered.
- `onDelete(employee)` — callback when Delete is triggered.

Functions
- Inline handlers on buttons that call `onEdit` and `onDelete`.

API calls
- None.

Dependencies
- `employeeUtils.formatDate`.

Components used
- None.

Who imports this file
- `src/pages/DashboardPage.jsx`.

What will break if modified
- Visual layout of the table; action callbacks not called.

Recommended changes
- None required; keep action handlers consistent.

Unsafe changes
- Altering markup structure in ways that change semantic table layout or remove `key={employee.id}` would break React reconciliation.

Safe changes
- Styling tweaks that don't alter markup semantics.

---

### `src/components/DeleteConfirmationModal.jsx`

Purpose
- Modal to confirm deletion; shows `Deleting...` state when `isDeleting` is true and calls `onConfirm(id)` when confirmed.

Imports
- `AlertTriangle` from `lucide-react`, React hooks `useEffect`, `useRef`, `memo`.

Exports
- Default `DeleteConfirmationModal` memoized.

State used
- No internal state; uses `isDeleting` prop to change button state.

Props
- `employee`, `isOpen`, `isDeleting`, `onClose`, `onConfirm`.

Functions
- None besides rendering and using `onConfirm(employee.id)`.

API calls
- None.

Who imports this file
- `src/pages/DashboardPage.jsx`.

What will break if modified
- The Delete flow if `onConfirm` signature or disabled logic changes.

Recommended changes
- Keep `isDeleting` wiring intact so users get feedback.

Unsafe changes
- Removing the disabling of buttons or the `onConfirm` call.

Safe changes
- Minor copy changes of messaging.

---

### `src/components/Loader.jsx`

Purpose
- Simple loading spinner used across the app while fetching data.

Imports
- React and minimal markup; may import CSS classes.

Exports
- Default `Loader` component.

State used
- None.

Props
- None.

Functions
- Renders spinner markup.

Who imports this file
- `DashboardPage.jsx` (for `isLoading`), and other components needing a spinner.

What will break if modified
- Visual appearance only.

Recommended changes
- Keep small and reusable.

---

### `src/components/EmptyState.jsx`

Purpose
- Displayed when filtered employees array is empty.

Imports
- None special.

Exports
- Default `EmptyState`.

Props
- Optional action handler to open create modal.

Who imports this file
- `DashboardPage.jsx`.

What will break if modified
- Not critical; just a UX element.

---

### `src/components/ErrorState.jsx`

Purpose
- Render a friendly message when fetching employees fails; provides a retry callback.

Imports
- None special.

Exports
- Default `ErrorState`.

Props
- `message` and `onRetry`.

Who imports this file
- `DashboardPage.jsx`.

What will break if modified
- Retry flow if `onRetry` is removed.

---

### `src/layout/MainLayout.jsx`

Purpose
- App layout with sidebar navigation, header, and outlet for routed pages. Handles logout action.

Imports
- React, routing hooks (e.g., `useNavigate`), icons, `AuthContext` or `useAuth` for logout, probably `Outlet` from react-router.

Exports
- Default `MainLayout`.

State used
- Minimal local state for UI toggles (sidebar collapsed in responsive cases) might be present.

Props
- Renders children via router `Outlet`.

Functions
- `logout` calls `auth.logout()` and then navigates to `/login`.

API calls
- None directly; calls `useAuth()` which may call `authService` on login/logout flows.

Who imports this file
- `src/routes/index.jsx` which wraps protected routes in the `MainLayout`.

What will break if modified
- Navigation structure may change; users might be redirected incorrectly.

Recommended changes
- Minimal cosmetic changes only.

Unsafe changes
- Removing `Outlet` or break route composition.

---

### `src/pages/DashboardPage.jsx`

Purpose
- Core page that loads employees, stores `employees` state, exposes search/filter/sort/pagination controls and wires CRUD operations.

Imports
- React hooks, icons, `toast` / `toastHelper`, `EmployeeTable`, `EmployeeFormModal`, `DeleteConfirmationModal`, `Loader`, `ErrorState`, `EmptyState`, `AnalyticsSection`, `employeeService`, and utilities from `employeeUtils`.

Exports
- Default `DashboardPage`.

State used (main):
- `employees` — master array of all employees fetched from API.
- `isLoading` — indicates fetch in-progress.
- `error` — fetch error message.
- `query`, `debouncedQuery` — search input and debounced value.
- `department`, `status`, `sortBy` — filters and sorting.
- `page`, `pageSize` — pagination state.
- `isModalOpen`, `selectedEmployee`, `isSaving` — modal and save state.
- `isDeleteModalOpen`, `isDeleting` — delete confirmation state.

Props
- None (page-level).

Functions
- `loadEmployees()` — fetches initial list from `employeeService.list()` and sets `employees`.
- `handleCreateOrUpdate(payload)` — if `selectedEmployee` present calls `employeeService.update` else `employeeService.create`. Updates `employees` state immutably and shows toast via helper. Also toggles `isSaving` and closes modal.
- `handleDelete(employeeId)` — calls `employeeService.remove`, filters out id from `employees` and shows toast. Manages `isDeleting` and delete modal.
- Pagination / sorting / filter logic built using `employeeUtils` helpers: `filterEmployees`, `sortEmployees`, `paginateEmployees`.

API calls
- `employeeService.list()`, `.create()`, `.update(id)`, `.remove(id)`.

Dependencies
- `employeeService`, `employeeUtils`, `EmployeeTable`, `EmployeeFormModal`.

Components used
- `EmployeeTable`, `EmployeeFormModal`, `DeleteConfirmationModal`, `Loader`, `ErrorState`, `EmptyState`, `AnalyticsSection`.

Who imports this file
- `src/routes/index.jsx` (as a page route).

What will break if modified
- The primary employee list behavior; changes to the state shape or the CRUD handlers may lead to reloads or loss of filter/pagination state.

Recommended changes
- When changing filtering/pagination, maintain `employees` as a single source of truth and compute derived lists via pure helpers.

Unsafe changes
- Replacing direct `setEmployees` updates with full re-fetches or page reloads — this can break the SPA behavior.

Safe changes
- UI-only changes in header markup; minor refactors to helper functions with tests.

---

### `src/pages/LoginPage.jsx`

Purpose
- Simple login page that collects credentials and calls `login(form)` via `useAuth()`; on success navigates to `/dashboard`.

Imports
- `useState`, `useNavigate` from react-router, `useAuth`, `toast`, icons `ShieldCheck`, `Eye`, `EyeOff`.

Exports
- Default `LoginPage`.

State used
- `form` — `{ email, password }`.
- `showPassword` — toggles visibility.
- `error` — error message for auth failure.

Props
- None.

Functions
- `handleSubmit(event)` — prevents default, calls `login`, shows toast and navigates on success.

API calls
- `useAuth().login()` which internally calls `authService`.

Who imports this file
- Route configuration.

What will break if modified
- Authentication flow if `login` or navigation is changed.

Recommended changes
- Keep submit handling unchanged (ensure `preventDefault`).

Unsafe changes
- Removing navigation after login or changing token handling without updating `AuthContext`.

Safe changes
- Styling or improving accessibility attributes.

---

### `src/routes/index.jsx`

Purpose
- Defines the application routes and maps pages to paths. Sets up `RouterProvider` for the root `App` to consume.

Imports
- React Router `createBrowserRouter`, page components, `MainLayout`, `ProtectedRoute`.

Exports
- `router` constant used by `App.jsx`.

State used
- None.

Functions
- Route table construction.

Who imports this file
- `App.jsx`.

What will break if modified
- Any change to route paths will affect navigation and bookmarked URLs.

Recommended changes
- Add routes by composing under `MainLayout` for protected pages.

Unsafe changes
- Removing `ProtectedRoute` from protected pages.

Safe changes
- Add new routes; ensure `ProtectedRoute` applies to pages requiring auth.

---

### `src/routes/ProtectedRoute.jsx`

Purpose
- Guards routes that require authentication. If unauthenticated, redirect to login.

Imports
- Hook to access auth (e.g., `useAuth`), React Router `Navigate`.

Exports
- Default `ProtectedRoute` component.

State used
- `auth` state from context.

Functions
- Renders children if authenticated; otherwise returns `<Navigate to="/login" replace />`.

Who imports this file
- `routes/index.jsx`.

What will break if modified
- Route protection could be bypassed; don't alter auth checks lightly.

---

### `src/context/AuthContext.jsx`

Purpose
- Provide authentication state and actions to the app.

Imports
- React `createContext`, `useState`, `useEffect` and `authService`.

Exports
- `AuthProvider` and context hook `useAuth` (or similar).

State used
- `user` or a token and `isAuthenticated` flag.

Functions
- `login(credentials)` — calls `authService.login`, stores token to `localStorage` and sets context state.
- `logout()` — removes token and clears state.

API calls
- `authService.login()`.

Who imports this file
- `App.jsx` provides `AuthProvider`; `useAuth` hook and `MainLayout`/pages use it.

What will break if modified
- Token persistence or routing that depends on authentication will break.

Recommended changes
- Keep token storage stable; prefer `localStorage` key changes with migration.

Unsafe changes
- Changes to token storage or auth lifecycle without migration plan.

Safe changes
- Improve error handling and add token expiry checks.

---

### `src/hooks/useAuth.js`

Purpose
- Convenience hook returning auth context methods (`login`, `logout`, `user`, `isAuthenticated`).

Imports
- `useContext` and `AuthContext`.

Exports
- Default `useAuth` hook.

Who imports this file
- `LoginPage`, `MainLayout`, other components needing auth.

What will break if modified
- Any consumer relying on exact function names.

---

### `src/services/api.js`

Purpose
- Axios instance configured with baseURL (`http://localhost:5000`) and a request interceptor that injects an `Authorization` header if a token exists in `localStorage`.

Imports
- axios.

Exports
- Default `api` axios instance.

Functions
- `api.interceptors.request.use((config) => { const token = localStorage.getItem('employee-management-token'); if (token) config.headers.Authorization = \`Bearer ${token}\`; return config; })`

Who imports this file
- `employeeService.js` and `authService.js`.

What will break if modified
- If baseURL or interceptors are changed it will affect all API calls globally.

Recommended changes
- Consider loading baseURL from environment variables for multiple environments.

Unsafe changes
- Removing the interceptor will cause authenticated endpoints to fail.

Safe changes
- Add response interceptors to centralize error handling.

---

### `src/services/employeeService.js`

Purpose
- Simple wrapper exposing employee CRUD API functions: `list`, `create`, `update`, `remove`.

Imports
- `api` axios instance.

Exports
- `employeeService` object with functions.

Functions
- `list()` → `api.get('/employees').then(r => r.data)`
- `create(payload)` → `api.post('/employees', payload).then(r => r.data)`
- `update(id, payload)` → `api.put(`/employees/${id}`, payload).then(r => r.data)`
- `remove(id)` → `api.delete(`/employees/${id}`).then(r => r.data)`

Who imports this file
- `DashboardPage.jsx`.

What will break if modified
- Any change to endpoints or response shape will break Dashboard CRUD handlers.

Recommended changes
- Add error wrapping to normalize error objects before returning to pages.

Unsafe changes
- Changing endpoint paths without updating backend or other callers.

Safe changes
- Add small retry or caching logic in development.

---

### `src/services/authService.js`

Purpose
- Handles authentication requests to backend and token management where needed (login endpoint details are abstracted here).

Imports
- `api` axios or direct axios.

Exports
- `authService` functions like `login(credentials)`.

Who uses it
- `AuthContext.jsx`.

What will break if modified
- Login flow; token issuance expectations.

---

### `src/utils/employeeUtils.js`

Purpose
- Utility helpers for employees: filtering by query, department/status, sorting, pagination, and format date helper.

Exports
- `filterEmployees({ employees, query, department, status })`
- `sortEmployees({ employees, sortBy })`
- `paginateEmployees({ employees, page, pageSize })`
- Constants: `EMPLOYEE_DEPARTMENTS`, `EMPLOYEE_STATUSES`.

Who imports this file
- `DashboardPage.jsx` and `EmployeeTable.jsx` for `formatDate`.

What will break if modified
- Any change to helper signatures or return shapes affects Dashboard computations.

Recommended changes
- Add unit tests for edge cases. There is already `employeeUtils.test.js`.

---

### `src/utils/employeeUtils.test.js`

Purpose
- Unit tests for `employeeUtils` helpers using Vitest.

Who imports this file
- Test runner (Vitest).

What will break if modified
- Tests may fail; intended to guard helper correctness.

---

### `src/constants/ui.js`

Purpose
- UI related constants. (Colors, default page sizes, etc.)

Who imports this file
- Components and pages using consistent constants.

---

### `src/assets/` (folder)

Purpose
- Static assets like logos, icons or sample images.

Who uses it
- `MainLayout` or header components referencing logo or images.

---

### `db.json` (project root — not in `src` but relevant)

Purpose
- Mock database for `json-server`. Contains initial `employees` array and other entities.

How used
- Start `json-server --watch db.json --port 5000` in dev to simulate backend.

---

## 4. Component Flow Diagram

High-level flow of components when the app runs:

App
↓
AuthProvider
↓
RouterProvider (`routes/index.jsx`)
↓
MainLayout (header + sidebar)
↓
Routes → DashboardPage (protected)
↓
DashboardPage composed of:
- AnalyticsSection
- Filters / Search / Sort controls (local state)
- EmployeeTable (renders current page)
- EmployeeFormModal (Add / Edit)
- DeleteConfirmationModal (Delete)

User interaction flow example (Add):

User clicks `Add Employee` (MainLayout/Dashboard)
↓
`isModalOpen` true → `EmployeeFormModal` displayed
↓
User fills form → `handleSubmit` in modal calls parent's `handleCreateOrUpdate(payload)`
↓
Parent (`DashboardPage`) sets `isSaving` true, calls `employeeService.create()`
↓
On success: `setEmployees(prev => [...prev, createdEmployee])`, `isSaving=false`, `isModalOpen=false`, `showSuccess('Employee added successfully')`
↓
EmployeeTable automatically reflects updated `employees` state

---

## 5. State Flow

Documenting the main states in the app:

- `employees` (DashboardPage)
  - Purpose: holds the master list of employees fetched from API.
  - Declared: `DashboardPage.jsx` (top-level state).
  - Updated: `loadEmployees()` initial fetch sets it; `handleCreateOrUpdate` and `handleDelete` update it on CRUD success.
  - Used by: `EmployeeTable` (current page), `AnalyticsSection` (metrics), `existingEmails` derived list for validation.
  - Affected components: all components that display or derive employee data.

- `isLoading` (DashboardPage)
  - Purpose: indicate initial fetch in progress.
  - Where declared: `DashboardPage.jsx`.
  - Used by: `Loader` vs content rendering.

- `isSaving` (DashboardPage)
  - Purpose: indicate create/update in progress.
  - Where declared: `DashboardPage.jsx`.
  - Used by: `EmployeeFormModal` (prop `isSubmitting`), Submit button disabled/label.

- `isDeleting` (DashboardPage)
  - Purpose: indicate delete in progress.
  - Where declared: `DashboardPage.jsx`.
  - Used by: `DeleteConfirmationModal` (prop `isDeleting`).

- `query`, `department`, `status`, `sortBy`, `page`, `pageSize`
  - Purpose: control filtering, sorting, pagination.
  - Where declared: `DashboardPage.jsx`.
  - Used by: `employeeUtils` helpers to compute derived lists.

- Auth state (AuthContext)
  - Purpose: holds token/user info; controls `ProtectedRoute`.
  - Where declared: `AuthContext.jsx`.
  - Used by: `ProtectedRoute`, `MainLayout` `logout`, and `api` interceptor reads `localStorage` token.

---

## 6. API Documentation

Base URL (development): http://localhost:5000 (controlled by `src/services/api.js`)

### Employees

- GET /employees
  - Purpose: Get list of employees.
  - Request Body: none.
  - Response: Array of employee objects. Each employee typically contains { id, name, email, department, designation, status, joiningDate, createdAt }.
  - Where called: `DashboardPage.loadEmployees()`.
  - State updated after success: `setEmployees(response)`.

- POST /employees
  - Purpose: Create a new employee.
  - Request Body: employee fields (name, email, department, designation, status, joiningDate, createdAt optional).
  - Response: created employee object including `id` assigned by server.
  - Where called: `DashboardPage.handleCreateOrUpdate()` when creating.
  - State updated: `setEmployees(prev => [...prev, createdEmployee])`.

- PUT /employees/:id
  - Purpose: Update existing employee.
  - Request Body: full employee payload.
  - Response: updated employee object.
  - Where called: `DashboardPage.handleCreateOrUpdate()` when editing.
  - State updated: `setEmployees(prev => prev.map(e => e.id === id ? updatedEmployee : e))`.

- DELETE /employees/:id
  - Purpose: Remove employee.
  - Request Body: none.
  - Response: removed record or empty result depending on server.
  - Where called: `DashboardPage.handleDelete()`.
  - State updated: `setEmployees(prev => prev.filter(e => e.id !== id))`.

### Authentication (authService)

- POST /login (example)
  - Purpose: Authenticate and return token/user data.
  - Request Body: { email, password }
  - Response: { token, user }
  - Where called: `AuthContext.login()` via `useAuth()` used in `LoginPage`.
  - State updated: Token saved to `localStorage`, `AuthContext` state updated.

Notes
- All service wrappers live in `src/services/` and use the `api` axios instance.
- If your backend returns different shapes (e.g., nested data), update services accordingly.

---

## 7. CRUD Flow (detailed)

### Add Employee

Files involved:
- `src/components/EmployeeFormModal.jsx` — collects form and calls `onSubmit`.
- `src/pages/DashboardPage.jsx` — `handleCreateOrUpdate(payload)` is the parent handler that calls `employeeService.create`.
- `src/services/employeeService.js` — `create(payload)` performs POST.
- `src/utils/toastHelper.js` — `showSuccess` emits toast message.
- `src/components/EmployeeTable.jsx` — updated via `employees` state change.
- `db.json` (dev) — new record persisted by json-server.

Functions called
- `EmployeeFormModal.handleSubmit` → `onSubmit(payload)` → `DashboardPage.handleCreateOrUpdate(payload)` → `employeeService.create(payload)`.

State updates
- `setIsSaving(true)` while request pending.
- On success: `setEmployees(prev => [...prev, createdEmployee])`, `isSaving=false`, `isModalOpen=false`.

Toast location
- `showSuccess('Employee added successfully')` called in `DashboardPage` after successful create. Toaster configured in `App.jsx` displays it in top-right with reserved top space.

Modal location
- `EmployeeFormModal` (modal closes on success).

### Edit Employee

Files involved
- `EmployeeTable.jsx` sends selected employee to `DashboardPage.openEditModal(employee)`.
- `EmployeeFormModal.jsx` pre-populates `form` with `employee` prop.
- `DashboardPage.handleCreateOrUpdate(payload)` makes `employeeService.update(selectedEmployee.id, payload)`.

Functions called
- `EmployeeFormModal.handleSubmit` → `onSubmit(payload)` → `DashboardPage.handleCreateOrUpdate(payload)` → `employeeService.update(id, payload)`.

State updates
- `setIsSaving(true)` while request pending.
- Upon success: `setEmployees(prev => prev.map((e) => e.id === id ? updatedEmployee : e))`.

Toast location
- `showSuccess('Employee updated successfully')`.

### Delete Employee

Files involved
- `EmployeeTable.jsx` triggers `onDelete(employee)` → `DashboardPage.openDeleteModal(employee)`.
- `DeleteConfirmationModal.jsx` shows, calls `onConfirm(employee.id)`.
- `DashboardPage.handleDelete(employeeId)` calls `employeeService.remove(employeeId)`.

Functions called
- `onConfirm` → `DashboardPage.handleDelete(employeeId)` → `employeeService.remove(employeeId)`.

State updates
- `setIsDeleting(true)` while pending.
- On success: `setEmployees(prev => prev.filter(e => e.id !== employeeId))`, `isDeleting=false`, close modal.

Toast location
- `showSuccess('Employee deleted successfully')`.


---

## 8. Event Flow (per-button and per-action)

### Add Button (Dashboard)
- Click `Add Employee` button
- Sets `isModalOpen` true in `DashboardPage`
- `EmployeeFormModal` rendered
- User fills out form
- Click `Save Employee` (type=submit)
  - `EmployeeFormModal.handleSubmit` runs: `preventDefault`, validation. If valid, calls `onSubmit`.
  - Parent `DashboardPage.handleCreateOrUpdate` sets `isSaving`, calls API, updates `employees`, closes modal, shows toast.

### Edit Button (Employee row)
- Click `Edit` on row
- `DashboardPage.openEditModal(employee)` sets `selectedEmployee` and `isModalOpen` true
- `EmployeeFormModal` prepopulates and user edits fields
- Click `Save Employee` → same submit flow as add but uses `employeeService.update` and `map` update.

### Delete Button (Employee row)
- Click `Delete` on row
- `DashboardPage.openDeleteModal(employee)` opens `DeleteConfirmationModal`
- Click `Delete` inside modal → `onConfirm(employee.id)` calls `DashboardPage.handleDelete` → API delete → filter state → toast.

### Search / Filter / Sorting
- Search input updates `query` (local state). Debounced value `debouncedQuery` used to compute filtered list.
- `employeeUtils.filterEmployees` and `sortEmployees` compute derived lists; pagination applied with `paginateEmployees`.
- No server-side search is used; filters are client-side.

### Pagination
- `page` and `pageSize` control current displayed subset. `Rows` selector bound to `pageSize`.

---

## 9. Routing Documentation

Routes (observed)
- `/login` — `LoginPage.jsx` (public)
- `/dashboard` — `DashboardPage.jsx` (protected, nested within `MainLayout`)
- `/` — typically redirects to `/dashboard` (implementation via `routes/index.jsx` may define root redirect)
- Protected routes use `ProtectedRoute.jsx` which checks auth and redirects to `/login` if not authenticated.

Layout used
- `MainLayout.jsx` wraps protected pages with header and sidebar.

404 handling
- If present, it would be handled by router config; not observed explicitly in code snapshot.

---

## 10. Dependency Graph

High-level dependencies (component → depends on):

- `DashboardPage.jsx` → `employeeService`, `employeeUtils`, `EmployeeTable`, `EmployeeFormModal`, `DeleteConfirmationModal`, `Loader`, `AnalyticsSection`.
- `EmployeeTable.jsx` → `formatDate` helper from `employeeUtils`.
- `EmployeeFormModal.jsx` → `EMPLOYEE_DEPARTMENTS` from `employeeUtils`.
- `MainLayout.jsx` → `useAuth` and `logout` functionality (AuthContext).
- `AuthContext.jsx` → `authService`, `api` interceptor via `localStorage` token.
- `api.js` → `localStorage` token; used by all services.

Use this to trace change impacts in the next sections.

---

## 11. Safe Modification Guide

This section describes where to change code for common features while minimizing risk.

- Pagination
  - Modify only:
    - `src/pages/DashboardPage.jsx` — pagination state (`page`, `pageSize`) and UI controls.
    - `src/utils/employeeUtils.js` — `paginateEmployees` if page logic needs changing.
  - Avoid touching:
    - `EmployeeTable.jsx` markup (it expects items array), `employeeService` (API layer).

- Search
  - Modify only:
    - `DashboardPage.jsx` (search box and debounced state), `employeeUtils.filterEmployees` for matching logic.
  - Avoid touching:
    - Data shape in `employees` state.

- Filter
  - Modify only:
    - `DashboardPage.jsx` filter state and `employeeUtils.filterEmployees` logic.

- Toast
  - Modify only:
    - `src/utils/toastHelper.js` for central behavior; `App.jsx` Toaster options (position/duration/style).
  - Avoid touching:
    - Individual components' calls to `showSuccess`/`showError` unless standardizing messages.

- Sidebar / Header
  - Modify only:
    - `src/layout/MainLayout.jsx` for small layout changes.
  - Avoid touching:
    - `routes/index.jsx` wiring for protected vs public routes.

- Employee Form
  - Modify only:
    - `src/components/EmployeeFormModal.jsx` validation, accessibility.
  - Avoid touching:
    - `DashboardPage.jsx` `handleCreateOrUpdate` signature unless updating both sides.

- Charts / Analytics
  - Modify only:
    - `src/components/AnalyticsSection.jsx` and any UI used inside.
  - Avoid touching:
    - `employees` state shape because charts derive directly from it.

---

## 12. Code Ownership Map

| Feature | Files | Functions | State | APIs | Dependencies |
|---|---:|---|---|---|---|
| Authentication | `src/context/AuthContext.jsx`, `src/hooks/useAuth.js`, `src/services/authService.js`, `src/pages/LoginPage.jsx` | `login()`, `logout()` | Auth token in localStorage, context state | `POST /login` | `api.js` |
| Employees Listing | `src/pages/DashboardPage.jsx`, `src/components/EmployeeTable.jsx`, `src/components/EmployeeFormModal.jsx`, `src/components/DeleteConfirmationModal.jsx` | `loadEmployees()`, `handleCreateOrUpdate()`, `handleDelete()` | `employees`, `isLoading`, `isSaving`, `isDeleting`, filters | `GET/POST/PUT/DELETE /employees` | `employeeService`, `employeeUtils` |
| UI Layout | `src/layout/MainLayout.jsx` | `logout()` | none | none | `useAuth()` |

---

## 13. Line Number Reference (approximate)

> Approximate line numbers based on current file layout — update when significant edits are made.

- `src/pages/DashboardPage.jsx`
  - Line ~1: imports and top-of-file constants
  - Line ~20: `DashboardPage` component start
  - Line ~40: state declarations (`employees`, `isLoading`, `error`)
  - Line ~60: `loadEmployees()` definition
  - Line ~110: filter/sort/pagination helpers and derived lists
  - Line ~140: `handleCreateOrUpdate()` function definition
  - Line ~190: `handleDelete()` function definition
  - Line ~260: JSX return and rendering (EmployeeTable, modals)

- `src/components/EmployeeFormModal.jsx`
  - Line ~1: imports
  - Line ~20: `initialForm` constant
  - Line ~40: `EmployeeFormModal` definition
  - Line ~80: `validate()` function
  - Line ~110: `handleFieldChange()`
  - Line ~130: `handleSubmit()`
  - Line ~170: JSX form and controls

- `src/components/EmployeeTable.jsx`
  - Line ~1: imports
  - Line ~10: `EmployeeTable` definition
  - Line ~40: table markup and iteration over `employees`

- `src/services/employeeService.js`
  - Line ~1: imports
  - Line ~3: `endpoint` constant
  - Line ~6: `list()`
  - Line ~10: `create()`
  - Line ~14: `update()`
  - Line ~18: `remove()`

- `src/services/api.js`
  - Line ~1: axios import
  - Line ~4: `api` axios creation (baseURL)
  - Line ~8: request interceptor adding Authorization header

- `src/context/AuthContext.jsx`
  - Line ~1: imports
  - Line ~20: provider & `login()` function
  - Line ~40: `logout()`

- `src/pages/LoginPage.jsx`
  - Line ~1: imports
  - Line ~12: `useState` and `useNavigate` setup
  - Line ~20: `handleSubmit()` function
  - Line ~50: JSX for form and controls

Adjust these line anchors locally if code moves; they are approximations to help new developers navigate the code.

---

## 14. Future Development Guide

How to safely add common items without breaking existing code:

- Add a new page
  1. Create new file under `src/pages/` (e.g., `NewPage.jsx`). Keep it self-contained.
  2. Add route to `src/routes/index.jsx`. If the page requires auth, wrap in `ProtectedRoute` and add under `MainLayout`.
  3. Keep layout and side bar unchanged.

- Add a new modal
  1. Add component in `src/components/` following `EmployeeFormModal` pattern.
  2. Parent page should manage `isModalOpen` state, pass submit callbacks, and keep `isSaving` state.

- Add a new API
  1. Add service function to `src/services/*Service.js` using `api` axios instance.
  2. Call service from the relevant page/component and update only local state on success.

- Add a new component
  1. Create a self-contained component under `src/components/`.
  2. Prefer props for configuration rather than reading global state.

- Add a new route
  1. Modify `src/routes/index.jsx` to add a route mapping to your page.
  2. Update `MainLayout` nav if you want the item to appear in the sidebar.

- Add a new table
  1. Reuse `EmployeeTable.jsx` patterns: accept `items` and callbacks, keep rendering pure and side-effect free.

- Add a new chart
  1. Add an `AnalyticsSection` subcomponent; keep it pure and provide it `employees` as props. Do not mutate the `employees` state directly.

Testing and CI suggestions
- Add unit tests for helpers in `src/utils` (Vitest already in repo). Add integration tests for CRUD flows if possible.

---

## 15. Common Mistakes

List of things you should NEVER change without careful reasoning:

- App Layout and Router wiring (`App.jsx`, `routes/index.jsx`, `MainLayout.jsx`). Changing them can break navigation, protected routes, and global providers.
- `AuthContext` and token storage — it affects all auth flows and API interceptors.
- `employees` state shape in `DashboardPage.jsx` — many components depend on the fields present.
- `employeeService` endpoint names — backend and other services assume these exact endpoints.
- Removing `preventDefault()` in forms — causes full-page reloads.

---

## 16. Change Impact Analysis

- If a developer changes `EmployeeList.jsx` (or `DashboardPage.jsx`):
  - Affected files: `EmployeeTable.jsx`, `EmployeeFormModal.jsx`, `DeleteConfirmationModal.jsx`, `AnalyticsSection.jsx` (if they read `employees` structure), tests related to `employeeUtils`.
  - Risk: pagination/filtering/sorting logic may break, or UI will reflect wrong fields.

- If `MainLayout.jsx` (sidebar) changes:
  - Affected files: any page expecting the layout structure; route breadcrumbs and nav links may break.

- If API changes (response shape or endpoints):
  - Affected components: `DashboardPage.jsx`, `AuthContext`, any code that consumes API responses. Update `employeeService` and add compatibility layer as needed.

---

## 17. Best Practices & Recommendations

- Naming conventions
  - Components: PascalCase (e.g., `EmployeeTable.jsx`).
  - Hooks: `use` prefix (e.g., `useAuth.js`).
  - Services: lowercase with `Service` suffix (`employeeService.js`).

- Folder conventions
  - Keep feature files grouped by domain: `components`, `pages`, `services`, `utils`.

- Component conventions
  - Keep components small and pure when possible; lift shared state to pages.
  - Do not have components perform unrelated side effects (e.g., navigation or global state modifications) without going through provided props or context.

- State conventions
  - Keep `employees` as the single source of truth in `DashboardPage` and compute derived lists with pure utility functions.
  - Use boolean flags (`isLoading`, `isSaving`, `isDeleting`) to control UI state. Always keep these flags co-located with the actions they represent.

- API conventions
  - Use `src/services/*` as single place to adjust endpoints. Keep API call signatures stable and return normalized results.

- Testing
  - Keep utility functions (filter/sort/paginate) fully unit tested.
  - Add integration test around the full Add/Edit/Delete flows: modal submit → API (mock) → state update → toast.

- Error handling
  - Normalize errors from `api` (axios) in response interceptors or service wrappers to show friendly `toast` messages.

---

## Appendix: Quick Debug Checklist for Page Reloads (SPA)

If page reloads during CRUD, check (in order):
1. Ensure form `handleSubmit` uses `event.preventDefault()` and `stopPropagation()` (in `EmployeeFormModal.jsx`).
2. Ensure no code calls `window.location.reload()` or `window.location.href` after success — repo scan shows none in core CRUD flow.
3. Verify submit buttons have `type="submit"` and are inside `<form>` that prevents native submit. If Enter triggers submit, ensure `preventDefault` runs.
4. Confirm `MainLayout` or top-level code does not call reload on events or network changes.
5. Confirm `index.html` does not contain an `<form action>` that causes a reload (it should not).

---

If you want, I can also generate a small README snippet (quick start) that lists dev commands, how to run `json-server` with `db.json`, and how to run tests.

End of DOCUMENTATION

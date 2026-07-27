# Employee Management Dashboard

A production-style employee management dashboard built with React, Vite, Tailwind CSS, React Router, Context API, Recharts, Axios, React Hot Toast, and json-server.

## Features

- Secure login flow with fake JWT-style session handling
- Fixed sidebar navigation with smooth section scrolling
- Dashboard summary cards
- Employee list with search, filtering, pagination, add/edit/delete forms
- Recharts-based analytics for department distribution, status distribution, and monthly joining trend
- Responsive layout for desktop, tablet, and mobile
- Professional empty, loading, and error states

## Tech Stack

- React 19
- Vite
- React Router DOM
- Tailwind CSS
- Axios
- Context API
- Recharts
- React Hot Toast
- json-server

## Getting Started

1. Install dependencies
   ```bash
   npm install
   ```

2. Start the mock API server
   ```bash
   npx json-server --watch db.json --port 5000
   ```

3. Start the frontend development server
   ```bash
   npm run dev
   ```

4. Open the app in your browser
   - Frontend: http://localhost:5173/
   - API: http://localhost:5000/employees

## Demo Login

Use any valid email and a password with at least 6 characters.

Example:
- Email: admin@example.com
- Password: password123

## Project Structure

- src/components - reusable UI components
- src/layout - application shell and navigation
- src/pages - dashboard and auth pages
- src/services - API layer for auth and employees
- src/context - authentication context
- src/routes - router configuration
- src/utils - shared helper functions

## Responsive Design Notes

The interface is optimized for:
- Desktop and laptop screens
- Tablet layouts with adjusted spacing
- Mobile screens with a collapsible sidebar and stacked controls
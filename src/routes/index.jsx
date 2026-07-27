import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import ProtectedRoute from './ProtectedRoute';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: '/dashboard',
            element: <DashboardPage />,
          },
          {
            path: '/employees',
            element: <DashboardPage />,
          },
          {
            path: '/',
            element: <DashboardPage />,
          },
        ],
      },
    ],
  },
]);

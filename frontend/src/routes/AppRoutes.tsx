import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router';

import {
  MainLayout,
} from '../layouts/MainLayout';

import {
  HomePage,
} from '../pages/HomePage';

import {
  LoginPage,
} from '../pages/LoginPage';

import {
  NotFoundPage,
} from '../pages/NotFoundPage';

import {
  PatientsPage,
} from '../pages/PatientsPage';

import {
  PatientCreatePage,
} from '../pages/PatientCreatePage';

import {
  PatientDetailsPage,
} from '../pages/PatientDetailsPage';

import {
  PatientEditPage,
} from '../pages/PatientEditPage';

import {
  ProtectedRoute,
} from './ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },

  {
    element: <ProtectedRoute />,

    children: [
      {
        path: '/',
        element: <MainLayout />,
        errorElement:
          <NotFoundPage />,

        children: [
          {
            index: true,
            element: <HomePage />,
          },

          {
            path: 'pacientes',
            element:
              <PatientsPage />,
          },

          {
            path: 'pacientes/novo',
            element:
              <PatientCreatePage />,
          },

          {
            path: 'pacientes/:id',
            element:
              <PatientDetailsPage />,
          },

          {
            path: 'pacientes/:id/editar',
            element:
              <PatientEditPage />,
          },
        ],
      },
    ],
  },
]);

export function AppRoutes() {
  return (
    <RouterProvider
      router={router}
    />
  );
}
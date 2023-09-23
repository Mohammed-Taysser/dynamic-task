import { LinearProgress } from '@mui/material';
import { Suspense, lazy } from 'react';
import { Navigate, createBrowserRouter, useLocation } from 'react-router-dom';
import BaseLayout from '../layouts/Base';
import { LocalStorage } from './localStorage';

function RequireAuth(props: { children: React.ReactElement }) {
  const location = useLocation();

  // TODO: replace  redux
  if (!LocalStorage.get('refreshToken')) {
    return <Navigate to='/login' state={{ next: location }} replace />;
  }

  return props.children;
}

function NoRequireAuth(props: { children: React.ReactElement }) {
  if (LocalStorage.get('refreshToken')) {
    return <Navigate to='/' replace />;
  }

  return <Suspense fallback={<LinearProgress />}>{props.children}</Suspense>;
}

// Auth
const Homepage = lazy(() => import('../pages/auth/Homepage'));

// Public
const NotFound = lazy(() => import('../pages/public/404'));
const Register = lazy(() => import('../pages/public/Register'));
const Login = lazy(() => import('../pages/public/Login'));

const routes = createBrowserRouter(
  [
    {
      path: '/',
      element: <BaseLayout />,
      children: [
        {
          path: '/',
          element: (
            <RequireAuth>
              <Homepage />
            </RequireAuth>
          ),
        },
      ],
    },
    {
      path: '/login',
      element: (
        <NoRequireAuth>
          <Login />
        </NoRequireAuth>
      ),
    },
    {
      path: '/register',
      element: (
        <NoRequireAuth>
          <Register />
        </NoRequireAuth>
      ),
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ],
  {
    basename: '/dynamic-task',
  }
);

export default routes;

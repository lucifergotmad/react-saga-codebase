import { createBrowserRouter, redirect } from 'react-router-dom';

import AdminDashboard from '@pages/admin';
import NavigationHandler from '@/shared/components/routes/navigation-handler';

import { PrivateRoutes } from './private-routes';
import { NotFound } from '@/shared/pages/not-found';
import { AppShell } from '@/shared/layouts/app-shell';
import { SignIn } from './auth/sign-in';
import { SignUp } from './auth/sign-up';
import { AdminUser } from './admin/user';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <NavigationHandler />,
    children: [
      { index: true, loader: async () => redirect('/admin') },
      {
        path: 'admin',
        element: (
          <PrivateRoutes>
            <AppShell />
          </PrivateRoutes>
        ),
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: 'user', element: <AdminUser /> },
          { path: '*', element: <NotFound /> },
        ],
      },
      {
        path: 'auth',
        children: [
          { index: true, loader: async () => redirect('/auth/sign-in') },
          { path: 'sign-in', element: <SignIn /> },
          { path: 'sign-up', element: <SignUp /> },
        ],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default routes;

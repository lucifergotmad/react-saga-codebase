import { createBrowserRouter, redirect } from 'react-router-dom';

import { PrivateRoutes } from '@/app/private-routes';
import { NotFound, AppShell, NavigationHandler } from '@/shared';
import { SignIn, SignUp } from '@/modules/auth';
import { AdminUser } from '@/modules/admin/users';
import { AdminDashboard } from '@/modules/admin/dashboard';

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
          { index: true, loader: async () => redirect('/admin/dashboard') },
          { path: 'dashboard', element: <AdminDashboard /> },
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

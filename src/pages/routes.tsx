import { createBrowserRouter, redirect } from 'react-router-dom';

import AdminDashboard from '@pages/admin';
import NavigationHandler from '@/shared/components/routes/navigation-handler';

import { PrivateRoutes } from './private-routes';
import { NotFound } from '@/shared/pages/not-found';
import { AppShell } from '@/shared/layouts/app-shell';

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
          { path: '*', element: <NotFound /> },
        ],
      },
      {
        path: 'auth',
        children: [{ index: true, loader: async () => redirect('/') }],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default routes;

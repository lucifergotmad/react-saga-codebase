import { createBrowserRouter, redirect } from 'react-router-dom';

import AdminDashboard from '@pages/admin';
import NotFound from '@/shared/pages/not-found';
import NavigationHandler from '@/shared/components/navigation-handler';

import { PrivateRoutes } from './private-routes';

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
            <AdminDashboard />
          </PrivateRoutes>
        ),
        children: [{ path: '*', element: <NotFound /> }],
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

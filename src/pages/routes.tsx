import { createBrowserRouter } from 'react-router-dom';

import Home from '@pages/home';
import SignIn from '@pages/auth/sign-in';
import AdminDashboard from '@pages/admin';
import DashboardLayout from '@/shared/layouts/dashboard';

const routes = createBrowserRouter([
  { path: '/', element: <Home /> },
  {
    path: '/admin',
    element: <DashboardLayout isFooter={false} />,
    children: [{ index: true, element: <AdminDashboard /> }],
  },
  { path: '/auth', element: <SignIn /> },
]);

export default routes;

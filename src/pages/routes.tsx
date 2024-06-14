import { createBrowserRouter } from 'react-router-dom';

import Home from '@pages/home';
import SignIn from '@pages/auth/sign-in';
import SignUp from '@pages/auth/sign-up';
import AdminDashboard from '@pages/admin';
import DashboardLayout from '@/shared/layouts/dashboard';
import NotFound from '@/shared/pages/not-found';

const routes = createBrowserRouter([
  { path: '/', element: <Home /> },
  {
    path: '/admin',
    element: <DashboardLayout isFooter={false} />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  {
    path: '/auth',
    element: <NotFound />,
    children: [
      { path: 'sign-in', element: <SignIn /> },
      { path: 'sign-up', element: <SignUp /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;

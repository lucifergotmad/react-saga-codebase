import { ThemeToggle } from '@/shared/components/theme-toggle';
import type { FC } from 'react';

const AdminDashboard: FC = () => {
  return (
    <div className="tw-flex tw-h-screen tw-w-full tw-flex-col tw-items-center tw-justify-center">
      <h1 className="tw-my-4">Hello Worlds!</h1>
      <ThemeToggle />
    </div>
  );
};

export default AdminDashboard;

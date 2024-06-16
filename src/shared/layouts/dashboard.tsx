import type { FC, PropsWithChildren } from 'react';

import SidebarContainer from '@components/sidebar';
import NavbarContainer from '@components/navbar';
import { Outlet } from 'react-router';

interface DashboardLayoutProps {
  isFooter?: boolean;
}

const DashboardLayout: FC<PropsWithChildren<DashboardLayoutProps>> = ({
  children,
  isFooter = true,
}) => {
  return (
    <div className="min-h-screen w-full">
      <NavbarContainer />
      <div className="flex h-full w-full items-start pt-2">
        <SidebarContainer />
        <MainContent isFooter={isFooter}>{children}</MainContent>
      </div>
    </div>
  );
};

const MainContent: FC<PropsWithChildren<DashboardLayoutProps>> = () => {
  return (
    <main className="relative h-full w-full overflow-y-auto bg-gray-50 px-8 py-4 dark:bg-gray-800 dark:text-white lg:ml-2">
      <Outlet />
    </main>
  );
};

export default DashboardLayout;

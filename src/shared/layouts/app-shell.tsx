import { cn } from '@/utils/design/classname';
import { Outlet } from 'react-router-dom';
import { useIsCollapsed } from '../hooks/themes';
import { Sidebar } from '../components/sidebar';
import { Layout, LayoutBody, LayoutHeader } from '../components/design/layout';
import { ThemeToggle } from '../components/theme-toggle';
import { UserNav } from '../components/user-nav';
import { SearchNav } from '../components/search-nav';

export const AppShell = () => {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed();

  return (
    <div className="relative h-full overflow-hidden bg-background">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <main
        id="content"
        className={cn(
          isCollapsed ? 'md:ml-14' : 'md:ml-64',
          'h-full overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0',
        )}
      >
        <Layout>
          <LayoutHeader>
            <div className="ml-auto flex items-center space-x-4">
              <SearchNav />
              <ThemeToggle />
              <UserNav />
            </div>
          </LayoutHeader>
          <LayoutBody>
            <Outlet />
          </LayoutBody>
        </Layout>
      </main>
    </div>
  );
};

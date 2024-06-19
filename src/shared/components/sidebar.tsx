import { useEffect, useState } from 'react';
import { IconChevronsLeft, IconMenu2, IconX } from '@tabler/icons-react';
import { Layout, LayoutHeader } from './design/layout';
import { CustomButton } from './custom/custom-button';
import { cn } from '@/utils/design/classname';
import { sidelinks } from '@/pages/side-links';
import { SideNav } from './side-nav';

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar = ({
  className,
  isCollapsed,
  setIsCollapsed,
}: SidebarProps) => {
  const [navOpened, setNavOpened] = useState(false);

  /* Make body not scrollable when navBar is opened */
  useEffect(() => {
    if (navOpened) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [navOpened]);

  // console.log(
  //   `md:bottom-0 md:right-auto md:h-svh fixed left-0 right-0 top-0 z-50 w-full border-r-2 border-r-muted transition-[width] ${
  //     isCollapsed ? 'md:w-14' : 'md:w-64'
  //   }`,
  // );

  console.log(
    `h-full flex-1 overflow-auto ${
      navOpened ? 'max-h-screen' : 'md:max-h-screen md:py-2 max-h-0 py-0'
    }`,
  );

  return (
    <aside
      className={cn(
        `md:bottom-0 md:right-auto md:h-svh fixed left-0 right-0 top-0 z-50 w-full border-r-2 border-r-muted transition-[width] ${
          isCollapsed ? 'md:w-14' : 'md:w-64'
        }`,
        className,
      )}
    >
      {/* Overlay in mobile */}
      <div
        onClick={() => setNavOpened(false)}
        className={`absolute inset-0 transition-[opacity] delay-100 duration-700 ${
          navOpened ? 'h-svh opacity-50' : 'h-0 opacity-0'
        } md:hidden w-full bg-black`}
      />

      <Layout>
        {/* Header */}
        <LayoutHeader className="md:px-4 sticky top-0 justify-between px-4 py-3 shadow">
          <div className={`flex items-center ${!isCollapsed ? 'gap-2' : ''}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              className={`transition-all ${
                isCollapsed ? 'h-6 w-6' : 'h-8 w-8'
              }`}
            >
              <rect width="256" height="256" fill="none"></rect>
              <line
                x1="208"
                y1="128"
                x2="128"
                y2="208"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              ></line>
              <line
                x1="192"
                y1="40"
                x2="40"
                y2="192"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              ></line>
              <span className="sr-only">Website Name</span>
            </svg>
            <div
              className={`flex flex-col justify-end truncate ${
                isCollapsed ? 'invisible w-0' : 'visible w-auto'
              }`}
            >
              <span className="font-medium">Shadcn Admin</span>
            </div>
          </div>

          {/* Toggle Button in mobile */}
          <CustomButton
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Toggle Navigation"
            aria-controls="sidebar-menu"
            aria-expanded={navOpened}
            onClick={() => setNavOpened((prev) => !prev)}
          >
            {navOpened ? <IconX /> : <IconMenu2 />}
          </CustomButton>
        </LayoutHeader>

        {/* Navigation links */}
        <SideNav
          id="sidebar-menu"
          className={`h-full flex-1 overflow-auto ${
            navOpened ? 'max-h-screen' : 'md:max-h-screen md:py-2 max-h-0 py-0'
          }`}
          closeNav={() => setNavOpened(false)}
          isCollapsed={isCollapsed}
          links={sidelinks}
        />

        {/* Scrollbar width toggle button */}
        <CustomButton
          onClick={() => setIsCollapsed((prev) => !prev)}
          size="icon"
          variant="outline"
          className="md:inline-flex absolute -right-5 top-1/2 hidden rounded-full"
        >
          <IconChevronsLeft
            stroke={1.5}
            className={`h-5 w-5 ${isCollapsed ? 'rotate-180' : ''}`}
          />
        </CustomButton>
      </Layout>
    </aside>
  );
};

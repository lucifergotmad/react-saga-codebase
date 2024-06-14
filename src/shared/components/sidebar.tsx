import { Sidebar } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { HiUsers } from 'react-icons/hi';

import type { FC } from 'react';

const SidebarContainer: FC = () => {
  const [currentPage, setCurrentPage] = useState('');

  useEffect(() => {
    const newPage = window.location.pathname;

    setCurrentPage(newPage);
  }, [setCurrentPage]);

  return (
    <Sidebar aria-label="Sidebar with multi-level dropdown example">
      <div className="flex h-full flex-col justify-between rounded py-2">
        <div>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                href="/users/list"
                icon={HiUsers}
                className={
                  '/users/list' === currentPage
                    ? 'bg-gray-100 dark:bg-gray-700'
                    : 'text-gray-600 dark:text-gray-400'
                }
              >
                Users
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </div>
      </div>
    </Sidebar>
  );
};

export default SidebarContainer;

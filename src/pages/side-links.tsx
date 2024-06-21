import { IconLayoutDashboard, IconUserCircle } from '@tabler/icons-react';

export interface NavLink {
  title: string;
  label?: string;
  href: string;
  icon?: JSX.Element;
  sub?: NavLink[];
}

export interface SideLink extends NavLink {
  sub?: NavLink[];
}

export const sidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: <IconLayoutDashboard size={20} />,
  },
  {
    title: 'User',
    href: '/admin/user',
    icon: <IconUserCircle size={20} />,
  },
];

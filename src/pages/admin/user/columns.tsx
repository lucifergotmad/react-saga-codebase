import { ColumnDef } from '@tanstack/react-table';

export type User = {
  id: string;
  username: number;
  level: 'ADMIN' | 'OWNER' | 'SU' | 'SUPERVISOR';
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'level',
    header: 'Level',
  },
  {
    accessorKey: 'username',
    header: 'Username',
  },
  {
    accessorKey: 'id',
    header: 'Id',
  },
];

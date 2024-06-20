import { UserLevel } from '@/shared/constants/user-level';
import { ColumnDef } from '@tanstack/react-table';
import ActionCell from './action-cell';

export type User = {
  _id: string;
  fullname: string;
  email: string;
  username: string;
  level: UserLevel;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: '_id',
    header: 'Id',
  },
  {
    accessorKey: 'fullname',
    header: 'Full Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'username',
    header: 'Username',
  },
  {
    accessorKey: 'level',
    header: 'Level',
  },
  {
    id: 'actions',
    cell: (props) => <ActionCell row={props.row} />,
  },
];

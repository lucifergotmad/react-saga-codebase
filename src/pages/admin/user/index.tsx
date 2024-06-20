import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/design/card';
import { columns } from './columns';
import { DataTable } from './data-table';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/config/store';
import { useSelector } from 'react-redux';
import { selectUserList } from '@/data/users/user.selector';
import { useEffect } from 'react';
import { getUserStart } from '@/data/users/user.slice';

export const AdminUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userList = useSelector(selectUserList);

  useEffect(() => {
    dispatch(getUserStart());
  }, [dispatch]);

  return (
    <div className="container mx-auto flex h-full items-center justify-center py-14">
      <Card className="w-full max-w-full">
        <CardHeader>
          <CardTitle className="text-lg">Users</CardTitle>
          <CardDescription>
            Manage your products and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={userList} />
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>{userList.length}</strong>{' '}
            users
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

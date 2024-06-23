import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/design/card';
import {
  columns,
  DataTable,
  selectUserList,
  getUserStart,
  UserAddForm,
} from '@/modules/admin/users';
import { AppDispatch } from '@/app/store';

export const AdminUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userList = useSelector(selectUserList);

  useEffect(() => {
    dispatch(getUserStart());
  }, [dispatch]);

  return (
    <div className="flex flex-col sm:gap-4 sm:py-8 sm:pl-8">
      <div className="grid flex-1 items-start gap-2 p-2 sm:px-6 sm:py-0 md:gap-4">
        <div className="ml-auto flex items-center gap-2">
          <UserAddForm />
        </div>
        <Card className="w-full max-w-full">
          <CardHeader>
            <CardTitle className="text-lg">Users</CardTitle>
            <CardDescription>
              Manage your users and view their details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={userList} />
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-10</strong> of{' '}
              <strong>{userList.length}</strong> users
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  GetUserResponse,
  deleteUserStart,
  editUserStart,
  UserEditInput,
  UserEditForm,
  UserDeleteForm,
} from '@/modules/admin/users';
import { selectCurrentUser } from '@/modules/auth';
import { toast } from '@/shared/components/design/use-toast';

interface ActionCellProps {
  row: { original: GetUserResponse };
}

const ActionCell: React.FC<ActionCellProps> = ({ row }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const userId = row.original._id;
  const isCurrentUser = row?.original?.username === currentUser?.username;

  const handleEdit = (data: UserEditInput) => {
    dispatch(editUserStart({ _id: userId, ...data }));
  };

  const handleDelete = () => {
    if (isCurrentUser) {
      toast({
        title: 'Error',
        description: 'Cannot delete your current user!',
        variant: 'destructive',
      });
    } else {
      dispatch(deleteUserStart(userId));
    }
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <UserEditForm user={row.original} onEditHandler={handleEdit} />
        <UserDeleteForm onDeleteHandler={handleDelete} />
      </div>
    </>
  );
};

export { ActionCell };

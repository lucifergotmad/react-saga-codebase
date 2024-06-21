import React from 'react';
import { useDispatch } from 'react-redux';
import { User } from './columns';
import { deleteUserStart, editUserStart } from '@/data/users/user.slice';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/data/auth/auth.selector';
import { toast } from '@/shared/components/design/use-toast';
import { UserDeleteForm } from './user-delete.form';
import { UserEditForm, UserEditInput } from './user-edit.form';

interface ActionCellProps {
  row: { original: User };
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

export default ActionCell;

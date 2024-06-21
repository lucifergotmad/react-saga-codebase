import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@/shared/components/design/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/design/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { User } from './columns';
import { deleteUserStart } from '@/data/users/user.slice';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/data/auth/auth.selector';
import { toast } from '@/shared/components/design/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/design/dialog';
import { UserDeleteForm } from './user-delete.form';

interface ActionCellProps {
  row: { original: User };
}

const ActionCell: React.FC<ActionCellProps> = ({ row }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const userId = row.original._id;
  const isCurrentUser = row?.original?.username === currentUser?.username;

  const confirmDelete = () => {
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Dialog>
            <DialogTrigger>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                Update item
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update form</DialogTitle>
                <DialogDescription>
                  Here you can add fields to update your form
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <DropdownMenuSeparator />
          <UserDeleteForm onDeleteHandler={confirmDelete} />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ActionCell;

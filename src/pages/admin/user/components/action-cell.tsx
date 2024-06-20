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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shared/components/design/alert-dialog';
import { deleteUserStart } from '@/data/users/user.slice';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/data/auth/auth.selector';
import { toast } from '@/shared/components/design/use-toast';

interface ActionCellProps {
  row: { original: User };
}

const ActionCell: React.FC<ActionCellProps> = ({ row }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const userId = row.original._id;
  const isCurrentUser = row?.original?.username === currentUser?.username;

  const handleEdit = () => {
    console.log('hi');
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
      <AlertDialog>
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
            <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
            <AlertDialogTrigger>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ActionCell;

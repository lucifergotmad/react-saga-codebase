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
import { DropdownMenuItem } from '@/shared/components/design/dropdown-menu';
import { HTMLAttributes } from 'react';

type UserDeleteFormProps = {
  onDeleteHandler: () => void;
} & HTMLAttributes<HTMLDialogElement>;

export const UserDeleteForm = ({
  onDeleteHandler,
  ...props
}: UserDeleteFormProps) => {
  return (
    <AlertDialog {...props}>
      <AlertDialogTrigger>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Delete item
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently remove your data
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDeleteHandler}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

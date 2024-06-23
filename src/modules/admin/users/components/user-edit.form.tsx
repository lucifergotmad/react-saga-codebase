import { HTMLAttributes, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Pencil1Icon } from '@radix-ui/react-icons';

import { Button } from '@/shared/components/design/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/design/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/design/form';
import { Input } from '@/shared/components/design/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/design/select';
import { RootState } from '@/app/root-state';
import { UserLevel, UserLevelList } from '@/shared';
import { cn } from '@/utils';
import {
  GetUserResponse,
  userEditSchema,
  UserEditInput,
} from '@/modules/admin/users';

type UserEditFormProps = {
  onEditHandler: (data: UserEditInput) => void;
  user: GetUserResponse;
} & HTMLAttributes<HTMLDivElement>;

export const UserEditForm = ({
  user,
  className,
  onEditHandler,
  ...props
}: UserEditFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading } = useSelector((state: RootState) => state.user);

  const formState = useForm<UserEditInput>({
    defaultValues: {
      fullname: user.fullname,
      email: user.email,
      level: user.level,
    },
    resolver: yupResolver(userEditSchema),
  });

  const onSubmitHandler = (data: UserEditInput) => {
    onEditHandler(data);
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      formState.reset();
    }
  }, [isOpen, user, formState]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={'ghost'}>
          <Pencil1Icon />
        </Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Update user</DialogTitle>
          <DialogDescription>
            Here you can modify your user data
          </DialogDescription>
        </DialogHeader>
        <div className={cn('grid gap-4 py-2', className)} {...props}>
          <Form {...formState}>
            <form onSubmit={formState.handleSubmit(onSubmitHandler)}>
              <div className="grid gap-2">
                <FormField
                  control={formState.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm">Full Name</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="family-name"
                          placeholder="Wijayanto"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="my-2 grid gap-2">
                <FormField
                  control={formState.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm">Email</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="email"
                          placeholder="admin@example.id"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="my-2 grid gap-2">
                <FormField
                  control={formState.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-sm">Level</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          name={field.name}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select their level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {UserLevelList.filter(
                                (value: UserLevel) => value !== 'SU',
                              ).map((value: UserLevel, index: number) => (
                                <SelectItem key={index} value={value}>
                                  {value}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter className="my-4">
                <Button type="submit" disabled={isLoading}>
                  Save changes
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

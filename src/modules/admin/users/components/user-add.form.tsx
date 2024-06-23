import { yupResolver } from '@hookform/resolvers/yup';
import { HTMLAttributes, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { PlusCircle } from 'lucide-react';

import { RootState } from '@/app/root-state';
import { AppDispatch } from '@/app/store';
import {
  userAddSchema,
  UserAddInput,
  addUserStart,
} from '@/modules/admin/users';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/design/form';
import { cn } from '@/utils';
import { Input } from '@/shared/components/design/input';
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/design/select';
import { PasswordInput, UserLevel, UserLevelList } from '@/shared';

interface UserAddFormProps extends HTMLAttributes<HTMLDivElement> {}

const INITIAL_VALUES: UserAddInput = {
  fullname: '',
  email: '',
  username: '',
  password: '',
  level: 'ADMIN',
};

export const UserAddForm = ({ className, ...props }: UserAddFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading } = useSelector((state: RootState) => state.user);

  const formState = useForm<UserAddInput>({
    defaultValues: INITIAL_VALUES,
    resolver: yupResolver(userAddSchema),
  });

  const onSubmitHandler = (data: UserAddInput) => {
    dispatch(addUserStart(data));
    formState.reset();
    setIsOpen(false);
  };

  const onCloseHandler = () => {
    formState.reset();
    setIsOpen(false);
  };

  const onClickHandler = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={(isOpen) => !isOpen && onCloseHandler()}
      >
        <DialogTrigger asChild>
          <Button onClick={onClickHandler} size="sm" className="h-7 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add User
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Add User</DialogTitle>
            <DialogDescription>
              Make changes to these fields. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className={cn('grid gap-4 py-2', className)} {...props}>
            <Form {...formState}>
              <form onSubmit={formState.handleSubmit(onSubmitHandler)}>
                <div className="my-2 grid grid-cols-2 gap-4">
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
                              placeholder={'Wijayanto'}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={formState.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel className="text-sm">Username</FormLabel>
                          <FormControl>
                            <Input
                              autoComplete="username"
                              placeholder={'admin'}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
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
                            placeholder={'admin@example.id'}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="my-2 grid grid-cols-2 gap-4">
                  <div className="my-2 grid gap-2">
                    <FormField
                      control={formState.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel className="text-sm">Password</FormLabel>
                          <FormControl>
                            <PasswordInput
                              autoComplete="new-password"
                              placeholder={'********'}
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
                              defaultValue={INITIAL_VALUES.level}
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
    </>
  );
};

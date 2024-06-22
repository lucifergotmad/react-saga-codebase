import { yupResolver } from '@hookform/resolvers/yup';
import { HTMLAttributes } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/design/form';
import { Input } from '@/shared/components/design/input';
import { Button } from '@/shared/components/design/button';
import { SignUpInput, signUpSchema } from '@/modules/auth/schemas';
import { cn } from '@/utils';
import { AppDispatch } from '@/app/store';
import { RootState } from '@/app/root-state';
import { signUpStart } from '@/modules/auth/data';
import { PasswordInput } from '@/shared';

interface SignUpFormProps extends HTMLAttributes<HTMLDivElement> {}

const INITIAL_VALUES: SignUpInput = {
  fullname: 'Octyo Paswa Putra',
  email: 'lucifergotmad@developer.id',
  username: 'lucifergotmad',
  password: 'Binary1010&',
  confirmPassword: 'Binary1010&',
};

export const SignUpForm = ({ className, ...props }: SignUpFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.auth);

  const formState = useForm<SignUpInput>({
    defaultValues: INITIAL_VALUES,
    resolver: yupResolver(signUpSchema),
  });

  const onSubmitHandler = (data: SignUpInput) => {
    dispatch(signUpStart(data));
  };

  return (
    <>
      <div className={cn('grid gap-4', className)} {...props}>
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
                          placeholder={INITIAL_VALUES.fullname}
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
                          placeholder={INITIAL_VALUES.username}
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
                      <Input placeholder={INITIAL_VALUES.email} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="my-2 grid gap-2">
              <FormField
                control={formState.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-sm">Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder={INITIAL_VALUES.password}
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
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-sm">Confirm Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder={INITIAL_VALUES.confirmPassword}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="my-4 w-full" disabled={isLoading}>
              Sign up
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

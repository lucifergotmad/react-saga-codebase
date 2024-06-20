import { RootState } from '@/config/root-state';
import { AppDispatch } from '@/config/store';
import { PasswordType } from '@/shared/types/password-type';
import { yupResolver } from '@hookform/resolvers/yup';
import { HTMLAttributes } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { schema } from '../schema';
import { cn } from '@/utils/design/classname';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/design/form';
import { Input } from '@/shared/components/design/input';
import { PasswordInput } from '@/shared/components/custom/password-input';
import { Button } from '@/shared/components/design/button';
import { signUpStart } from '@/data/auth/auth.slice';

interface SignUpFormProps extends HTMLAttributes<HTMLDivElement> {}

export type SignUpInput = {
  username: string;
  confirmPassword: string;
} & PasswordType;

const INITIAL_VALUES: SignUpInput = {
  username: 'lucifergotmad',
  password: 'Binary1010&',
  confirmPassword: 'Binary1010&',
};

export const SignUpForm = ({ className, ...props }: SignUpFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.auth);

  const formState = useForm<SignUpInput>({
    defaultValues: INITIAL_VALUES,
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data: SignUpInput) => {
    dispatch(signUpStart(data));
  };

  return (
    <>
      <div className={cn('grid gap-4', className)} {...props}>
        <Form {...formState}>
          <form onSubmit={formState.handleSubmit(onSubmitHandler)}>
            <div className="grid gap-2">
              <FormField
                control={formState.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-sm">Username</FormLabel>
                    <FormControl>
                      <Input placeholder={INITIAL_VALUES.username} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <Button
                type="submit"
                className="my-2 w-full"
                disabled={isLoading}
              >
                Sign up
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

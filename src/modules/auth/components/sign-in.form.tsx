import { HTMLAttributes } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { SignInInput, signInSchema } from '@/modules/auth/schemas';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/design/form';
import { Checkbox } from '@/shared/components/design/checkbox';
import { Button } from '@/shared/components/design/button';
import { Input } from '@/shared/components/design/input';
import { cn } from '@/utils';
import { PasswordInput } from '@/shared';

interface SignInFormProps extends HTMLAttributes<HTMLDivElement> {}

const INITIAL_VALUES: SignInInput = {
  username: '',
  password: '',
  rememberMe: false,
};

export const SignInForm = ({ className, ...props }: SignInFormProps) => {
  const formState = useForm<SignInInput>({
    defaultValues: INITIAL_VALUES,
    resolver: yupResolver(signInSchema),
  });

  const onSubmitHandler = (data: SignInInput) => {
    console.log(data);
  };

  return (
    <>
      <div className={cn('grid gap-4', className)} {...props}>
        <Form {...formState}>
          <form onSubmit={formState.handleSubmit(onSubmitHandler)}>
            <div className="my-2 grid gap-2">
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
            <div className="my-4 flex items-center justify-start">
              <FormField
                control={formState.control}
                name="rememberMe"
                render={({ field: { value, onChange } }) => (
                  <FormItem className="flex items-center space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={value}
                        onCheckedChange={onChange}
                        aria-describedby="remember"
                        id="remember"
                      />
                    </FormControl>
                    <div className="ml-3 items-center text-sm">
                      <FormLabel
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="my-4 w-full" disabled={false}>
              Sign in
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

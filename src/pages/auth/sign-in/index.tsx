import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, Checkbox, TextInput } from 'flowbite-react';

import { schema } from './sign-in.schema';

export type TSignInInput = {
  username: string;
  password: string;
};

const INITIAL_VALUES: TSignInInput = {
  username: 'admin',
  password: 'B1n4ry1010&',
};

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignInInput>({
    defaultValues: INITIAL_VALUES,
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data: TSignInInput) => console.log(data);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <Card className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0 dark:border dark:border-gray-700 dark:bg-gray-800">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmitHandler)}
            >
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your username
                </label>
                <TextInput
                  {...register('username')}
                  type="text"
                  id="username"
                  color={errors.username && 'failure'}
                  helperText={
                    errors.username && (
                      <>
                        <span className="font-medium">Oops!</span>{' '}
                        {errors.username.message}
                      </>
                    )
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <TextInput
                  {...register('password')}
                  type="password"
                  id="password"
                  color={errors.password && 'failure'}
                  helperText={
                    errors.password && (
                      <>
                        <span className="font-medium">Oops!</span>{' '}
                        {errors.password.message}
                      </>
                    )
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <Checkbox
                      id="remember"
                      aria-describedby="remember"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-primary-600 dark:text-primary-500 text-sm font-medium hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <Button color="dark" type="submit">
                Sign in
              </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{' '}
                <a
                  href="#"
                  className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default SignIn;

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, Checkbox, TextInput } from 'flowbite-react';

import { schema } from '@pages/auth/sign-in/schema';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/config/store';
import { useSelector } from 'react-redux';
import { RootState } from '@/config/root-state';
import { signInStart } from '@/data/user.slice';
import { PasswordType } from '@/shared/types/password-type';
import PasswordInput from '@/shared/components/password-input';

export type SignInInput = {
  username: string;
  rememberMe?: boolean;
} & PasswordType;

const INITIAL_VALUES: SignInInput = {
  username: 'admin',
  password: 'B1n4ry1010&',
  rememberMe: false,
};

const SignIn = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInput>({
    defaultValues: INITIAL_VALUES,
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data: SignInInput) => {
    dispatch(signInStart(data));
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <Card className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
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
                <PasswordInput
                  passwordProps={register('password')}
                  errors={errors}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <Checkbox
                      {...register('rememberMe')}
                      id="remember"
                      aria-describedby="remember"
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
              <Button
                color="dark"
                type="submit"
                disabled={isLoading ? true : false}
              >
                Sign in
              </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account yet?{' '}
                <Link
                  to={'/auth/sign-up'}
                  className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default SignIn;

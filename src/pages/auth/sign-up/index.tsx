import { RootState } from '@/config/root-state';
import { AppDispatch } from '@/config/store';
import PasswordInput from '@/shared/components/password-input';
import { PasswordType } from '@/shared/types/password-type';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, TextInput } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { schema } from './schema';
import { signUpStart } from '@/data/auth/auth.slice';

export type SignUpInput = {
  username: string;
  confirmPassword: string;
} & PasswordType;

const INITIAL_VALUES: SignUpInput = {
  username: 'lucifergotmad',
  password: 'Binary1010&',
  confirmPassword: 'Binary1010&',
};

const SignUp = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { isLoading } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>({
    defaultValues: INITIAL_VALUES,
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data: SignUpInput) => {
    dispatch(signUpStart(data));
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <Card className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Create your account
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
                  autoComplete="username"
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
                  id="password"
                  fieldName="password"
                  passwordProps={register('password')}
                  errors={errors}
                  autoComplete="new-password"
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <PasswordInput
                  fieldName="confirmPassword"
                  id="confirmPassword"
                  passwordProps={register('confirmPassword')}
                  errors={errors}
                  autoComplete="new-password"
                />
              </div>
              <Button
                color="dark"
                type="submit"
                disabled={isLoading ? true : false}
              >
                Sign Up
              </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{' '}
                <Link
                  to={'/auth/sign-in'}
                  className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default SignUp;

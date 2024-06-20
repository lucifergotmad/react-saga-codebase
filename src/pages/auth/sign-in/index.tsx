import { selectCurrentUser } from '@/data/auth/auth.selector';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/design/card';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { SignInForm } from './components/sign-in.form';

export const SignIn = () => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (currentUser) {
      navigate('/admin');
    }
  }, [currentUser, navigate]);

  return (
    <div className="container grid h-svh flex-col items-center justify-center bg-primary-foreground lg:max-w-none lg:px-0">
      <Card className="mx-auto max-w-sm py-4">
        <CardHeader>
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>
            Enter your credential below to sign into your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link to={'/auth/sign-up'} className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

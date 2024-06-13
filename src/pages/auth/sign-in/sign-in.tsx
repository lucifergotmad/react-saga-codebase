import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { schema } from './sign-in.schema';

export type TSignInInput = {
  username: string;
  password: string;
};

const INITIAL_VALUES: TSignInInput = {
  username: 'admin',
  password: 'admin',
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
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <label htmlFor="username">Username</label>
      <input {...register('username')} />
      {errors.username && <p>{errors.username.message}</p>}

      <br />
      <label htmlFor="password">Password</label>
      <input {...register('password')} />
      {errors.password && <p>{errors.password.message}</p>}
      <br />

      <input type="submit" className="bg-black text-white" />
    </form>
  );
};

export default SignIn;

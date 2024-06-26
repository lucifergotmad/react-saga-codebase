import * as yup from 'yup';

import { UserLevelList } from '@/shared';

export const userAddSchema = yup.object().shape({
  fullname: yup
    .string()
    .max(50, 'Length must be lest than 50 characters')
    .required('Fullname is required!'),
  email: yup.string().email('Email is invalid!').required('Email is required!'),
  username: yup.string().required('Username is required!'),
  password: yup
    .string()
    .required('Password is required!')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      'Password must contain atleast 1 uppercase, lowercase, and number',
    ),
  level: yup.string().optional().oneOf(UserLevelList, 'Level is invalid!'),
});

export type UserAddInput = yup.InferType<typeof userAddSchema>;

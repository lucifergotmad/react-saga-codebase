import * as yup from 'yup';

import { UserLevelList } from '@/shared';

export const userEditSchema = yup.object().shape({
  fullname: yup
    .string()
    .max(50, 'Length must be lest than 50 characters')
    .required('Fullname is required!'),
  email: yup.string().email('Email is invalid!').required('Email is required!'),
  level: yup.string().optional().oneOf(UserLevelList, 'Level is invalid!'),
});

export type UserEditInput = yup.InferType<typeof userEditSchema>;

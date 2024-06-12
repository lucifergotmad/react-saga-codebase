import * as yup from 'yup';

export const schema = yup.object().shape({
  username: yup.string().required('Username is required!'),
  password: yup
    .string()
    .required('Password is required!')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      'Password must contain atleast 1 uppercase, lowercase, number, and symbols',
    ),
});

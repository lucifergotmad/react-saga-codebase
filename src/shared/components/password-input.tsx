import { FC, useState } from 'react';
import { TextInput, TextInputProps } from 'flowbite-react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { UseFormRegisterReturn, FieldErrors } from 'react-hook-form';
import { PasswordType } from '@/shared/types/password-type';

interface PasswordInputProps extends TextInputProps {
  passwordProps: UseFormRegisterReturn<'password'>;
  errors: FieldErrors<PasswordType>;
}

const PasswordInput: FC<PasswordInputProps> = ({
  passwordProps,
  errors,
  ...rest
}) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="relative">
      <TextInput
        {...passwordProps}
        {...rest}
        type={isShowPassword ? 'text' : 'password'}
        id="password"
        color={errors.password ? 'failure' : undefined}
        helperText={
          errors.password && (
            <>
              <span className="font-medium">Oops!</span>{' '}
              {errors.password.message}
            </>
          )
        }
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500"
      >
        {isShowPassword ? <HiEyeOff /> : <HiEye />}
      </button>
    </div>
  );
};

export default PasswordInput;

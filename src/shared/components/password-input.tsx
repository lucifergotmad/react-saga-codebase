import { FC, useState } from 'react';
import { TextInput, TextInputProps } from 'flowbite-react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { UseFormRegisterReturn, FieldErrors } from 'react-hook-form';

import { PasswordType } from '@/shared/types/password-type';

interface PasswordInputProps extends TextInputProps {
  passwordProps: UseFormRegisterReturn<string>;
  errors: FieldErrors<PasswordType>;
  fieldName: keyof PasswordType;
}

const PasswordInput: FC<PasswordInputProps> = ({
  passwordProps,
  errors,
  fieldName,
  name,
  ...rest
}) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div>
      <div className="relative">
        <TextInput
          {...passwordProps}
          {...rest}
          type={isShowPassword ? 'text' : 'password'}
          color={errors[fieldName] ? 'failure' : undefined}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500"
        >
          {isShowPassword ? <HiEyeOff /> : <HiEye />}
        </button>
      </div>

      {errors[fieldName] && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          <span className="font-medium">Oops!</span>{' '}
          {errors[fieldName]?.message}
        </p>
      )}
    </div>
  );
};

export default PasswordInput;

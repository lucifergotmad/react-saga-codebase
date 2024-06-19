import { VariantProps } from 'class-variance-authority';
import { buttonVariants } from '../design/types/button-variants';
import { cn } from '@/utils/design/classname';
import { Slot } from '@radix-ui/react-slot';
import React from 'react';
import { IconLoader } from '@tabler/icons-react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftSection?: JSX.Element;
  rightSection?: JSX.Element;
}

const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      children,
      disabled,
      loading = false,
      leftSection,
      rightSection,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={loading || disabled}
        ref={ref}
        {...props}
      >
        {((leftSection && loading) ||
          (!leftSection && !rightSection && loading)) && (
          <IconLoader className="mr-2 h-4 w-4 animate-spin" />
        )}
        {!loading && leftSection && <div className="mr-2">{leftSection}</div>}
        {children}
        {!loading && rightSection && <div className="ml-2">{rightSection}</div>}
        {rightSection && loading && (
          <IconLoader className="ml-2 h-4 w-4 animate-spin" />
        )}
      </Comp>
    );
  },
);
CustomButton.displayName = 'Button';

export { CustomButton };

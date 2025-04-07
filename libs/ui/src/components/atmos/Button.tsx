import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils/cn';

export interface IButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>,
    VariantProps<typeof buttonVariants> {}

const buttonVariants = cva(
  'items-center justify-center rounded-md font-medium',
  {
    variants: {
      intent: {
        primary: ['bg-blue-500', 'text-white', 'border-transparent'],
        secondary: ['bg-white', 'text-gray-800', 'border-gray-400'],
      },
      size: {
        small: ['text-sm', 'py-1', 'px-2'],
        medium: ['text-base', 'py-2', 'px-4'],
      },
      disabled: {
        false: null,
        true: ['opacity-50', 'cursor-not-allowed'],
      },
    },
    compoundVariants: [
      {
        intent: 'primary',
        disabled: false,
        class: 'hover:bg-blue-600',
      },
      {
        intent: 'secondary',
        disabled: false,
        class: 'hover:bg-gray-100',
      },
      { intent: 'primary', size: 'medium', class: 'uppercase' },
    ],
    defaultVariants: {
      disabled: false,
      intent: 'primary',
      size: 'medium',
    },
  },
);

const Button = ({
  children,
  className = '',
  intent = 'primary',
  size = 'medium',
  disabled,
}: IButtonProps) => {
  return (
    <button
      className={cn(
        'inline-flex',
        buttonVariants({ intent, size, disabled }),
        className,
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
export default Button;

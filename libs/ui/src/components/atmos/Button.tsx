import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils/cn';
import { Loader } from '../molecules/Loader';

export interface IButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean; //직접 추가한 커스텀 prop
}

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
      loading: {
        false: null,
        true: ['opacity-50 cursor-not-allowed'],
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
      disabled: true,
      intent: 'primary',
      size: 'medium',
      loading: false,
    },
  },
);

const Button = ({
  children,
  className = '',
  intent = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
}: IButtonProps) => {
  return (
    <button
      className={cn(
        'inline-flex',
        buttonVariants({ intent, size, disabled, loading }),
        className,
      )}
      disabled={disabled || loading} //OR 둘 중 하나가 참일때 버튼은 비활성화됨
    >
      {loading ? (
        <>
          <div>
            <Loader />
          </div>
        </>
      ) : (
        <>{children}</>
      )}
    </button>
  );
};
export default Button;

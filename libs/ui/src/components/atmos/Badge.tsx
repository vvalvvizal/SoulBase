import { cva } from 'class-variance-authority';
import { ReactNode } from 'react';
import { cn } from '../../../utils/cn';

export interface IBadgeProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'gray' | 'red' | 'yellow' | 'green';
}

const badgeVariants = cva(
  ' transition-all  items-center shadow justify-center duration-300 rounded-full',
  {
    variants: {
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2 py-1 text-sm',
        lg: 'px-3 py-1.5',
      },
      variant: {
        primary: 'bg-primary-100 border border-white text-primary-900',
        gray: 'bg-gray-100 border border-white text-gray-900',
        red: 'bg-red-100 border border-white text-red-900',
        yellow: 'bg-yellow-100 border border-white text-yellow-900',
        green: 'bg-green-100 border border-white text-green-900',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'gray',
    },
  },
);

const Badge = ({
  children,
  className = '',
  size = 'md',
  variant = 'gray',
}: IBadgeProps) => {
  return (
    <span
      className={cn('inline-flex', badgeVariants({ size, variant }), className)}
    >
      {children}
    </span>
  );
};

export default Badge;

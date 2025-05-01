import { IconExclamationCircle } from '@tabler/icons-react';
import { cva } from 'class-variance-authority';
import { ReactNode } from 'react';
import { cn } from '../../../utils/cn';


export interface IFormErrorProps {
  error?: string;
  className?: string;
  variant?:'primary'|'white';
  size?:'sm'|'md'|'lg';
}

const formErrorVariants = cva(
'flex justify-start items-center gap-1 mt-1',
{
  variants: {
    variant:{
      primary:'text-gray-900',
      white:'text-white',
    },
    size:{
      sm:'text-xs',
      md:'text-sm',
      lg:'text-lg', 
    }
  }
  ,
  defaultVariants: {
    size:'sm',
    variant:'primary',
  },
},
);


export const FormError = ({ error, className, size='sm', variant='primary' }: IFormErrorProps) => {
  if (error) {
    //error prop이 있으면
    return (
      <div className={cn(formErrorVariants({size, variant}),className)}>
        <IconExclamationCircle className="inline w-4 h-4 text-red-600" />
        {error}
      </div>
    );
  }
};

import { FormHTMLAttributes } from 'react';
import React from 'react';

export type ErrorType = {
  fieldName: string;
  message?: string;
};

type FormProps = {
  error?: ErrorType[];
} & FormHTMLAttributes<HTMLFormElement>;

export const Form = React.forwardRef<HTMLFormElement, FormProps>(
  (props, ref) => (
    <form
      ref={ref}
      className="flex flex-col w-full gap-2 appearance-none placeholder-gray focus:ring-primary sm:text-sm"
      {...props}
    >
      {props.children}
      {props.error?.length ? <div>{props.error?.length}</div> : null}
    </form>
  ),
);

Form.displayName = 'Form';

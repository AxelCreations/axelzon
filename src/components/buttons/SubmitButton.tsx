"use client"

import { ComponentProps } from "react";
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

type SubmitButtonProps = {
  children: React.ReactNode,
  className?: string,
} & ComponentProps<"button">

const SubmitButton = ( {children, className, ...props}: SubmitButtonProps ): JSX.Element => {
  const { pending } = useFormStatus();
  
  return (
    <button 
      {...props}
      className={`btn btn-primary ${className}`} 
      type="submit"
      disabled={pending}
    >
        {pending && <span className="loading loading-spinner" />}
        {children}
      </button>
  )
}

export default SubmitButton;

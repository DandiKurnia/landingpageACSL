import { ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'outline';
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', ...props }, ref) => {
    const variants = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700',
      secondary: 'bg-gray-600 text-white hover:bg-gray-700',
      outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50',
    };

    return (
      <button
        ref={ref}
        className={`px-4 py-2 rounded-md font-medium transition ${variants[variant]} ${className}`}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

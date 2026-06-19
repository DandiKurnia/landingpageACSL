import { HTMLAttributes } from 'react';

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: 'default' | 'success' | 'warning';
};

export function Badge({ className = '', variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <span
      className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${variants[variant]} ${className}`}
      {...props}
    />
  );
}

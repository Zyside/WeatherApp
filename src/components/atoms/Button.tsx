import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost';
  className?: string;
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  className = '',
  children,
  ...rest
}) => (
  <button
    className={
      'px-4 py-2 rounded-2xl font-medium transition ' +
      (variant === 'primary'
        ? 'bg-sky-600 text-white hover:bg-sky-700 disabled:opacity-60 '
        : 'bg-gray-50 hover:bg-gray-100 text-gray-800 border ') +
      className
    }
    {...rest}
  >
    {children}
  </button>
);

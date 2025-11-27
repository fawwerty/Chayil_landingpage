import { forwardRef } from 'react';

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  ...props
}, ref) => {
  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-md
    transition-all duration-200 focus:outline-none focus:ring-2
    focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50
    disabled:cursor-not-allowed
  `;

  const variants = {
    primary: `
      bg-teal-500 text-black hover:bg-teal-400 focus:ring-teal-500
      shadow-lg hover:shadow-xl transform hover:-translate-y-0.5
    `,
    secondary: `
      bg-gray-700 text-gray-300 hover:bg-gray-600 focus:ring-gray-500
      border border-teal-500/30 hover:border-teal-500/50
    `,
    danger: `
      bg-red-600 text-white hover:bg-red-500 focus:ring-red-500
      shadow-lg hover:shadow-xl transform hover:-translate-y-0.5
    `,
    ghost: `
      bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white
      focus:ring-gray-500 border border-transparent hover:border-gray-600
    `,
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const buttonClasses = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${loading ? 'cursor-wait' : ''}
    ${className}
  `;

  return (
    <button
      ref={ref}
      className={buttonClasses}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;

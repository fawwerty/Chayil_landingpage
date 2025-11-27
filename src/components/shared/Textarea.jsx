import { forwardRef } from 'react';

const Textarea = forwardRef(({
  label,
  error,
  className = '',
  containerClassName = '',
  required = false,
  ...props
}, ref) => {
  const baseTextareaClasses = `
    w-full px-3 py-2 bg-gray-800 border rounded-md text-gray-300
    placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500
    focus:border-transparent transition-colors duration-200 resize-vertical
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const textareaClasses = `${baseTextareaClasses} ${
    error
      ? 'border-red-500/50 focus:ring-red-500'
      : 'border-teal-500/30'
  } ${className}`;

  return (
    <div className={`space-y-1 ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        className={textareaClasses}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;

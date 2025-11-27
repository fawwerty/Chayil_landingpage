import { forwardRef } from 'react';

const Select = forwardRef(({
  label,
  error,
  options = [],
  placeholder = 'Select an option',
  className = '',
  containerClassName = '',
  required = false,
  ...props
}, ref) => {
  const baseSelectClasses = `
    w-full px-3 py-2 bg-gray-800 border rounded-md text-gray-300
    focus:outline-none focus:ring-2 focus:ring-teal-500
    focus:border-transparent transition-colors duration-200
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const selectClasses = `${baseSelectClasses} ${
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
      <select
        ref={ref}
        className={selectClasses}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value || option}
            value={option.value || option}
          >
            {option.label || option}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;

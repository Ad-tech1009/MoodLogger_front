import React from "react";
import PropTypes from "prop-types";
import { Label } from "./label";

// Form component
export const Form = ({ children, onSubmit, className = "" }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      {children}
    </form>
  );
};

Form.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func,
  className: PropTypes.string,
};

// FormGroup component
export const FormGroup = ({ children, className = "" }) => (
  <div className={`space-y-2 mb-4 ${className}`}>{children}</div>
);

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

// FormLabel component
export const FormLabel = ({ htmlFor, children, className = "" }) => (
  <Label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 ${className}`}>
    {children}
  </Label>
);

FormLabel.propTypes = {
  htmlFor: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

// FormTextarea component
export const FormTextarea = React.forwardRef(({ 
  id, 
  name, 
  placeholder, 
  value, 
  onChange,
  rows = 3,
  required = false,
  disabled = false,
  className = "",
  error,
  ...props 
}, ref) => (
  <div className="w-full">
    <textarea
      ref={ref}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      disabled={disabled}
      required={required}
      className={`
        w-full px-3 py-2 border rounded-md shadow-sm
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
        disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
        ${error ? "border-red-500" : "border-gray-300"}
        ${className}
      `}
      {...props}
    />
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
));

FormTextarea.displayName = "FormTextarea";

FormTextarea.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  rows: PropTypes.number,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  error: PropTypes.string,
};

// FormSelect component
export const FormSelect = React.forwardRef(({ 
  id, 
  name, 
  options = [],
  value, 
  onChange,
  required = false,
  disabled = false,
  className = "",
  error,
  ...props 
}, ref) => (
  <div className="w-full">
    <select
      ref={ref}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      className={`
        w-full px-3 py-2 border rounded-md shadow-sm bg-white
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
        disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
        ${error ? "border-red-500" : "border-gray-300"}
        ${className}
      `}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
));

FormSelect.displayName = "FormSelect";

FormSelect.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  error: PropTypes.string,
};
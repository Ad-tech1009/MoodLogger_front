import React from "react";
import PropTypes from "prop-types";

export const Label = React.forwardRef(({ 
  htmlFor, 
  children, 
  className = "", 
  ...props 
}, ref) => {
  return (
    <label
      ref={ref}
      htmlFor={htmlFor}
      className={`text-sm font-medium text-gray-700 ${className}`}
      {...props}
    >
      {children}
    </label>
  );
});

Label.displayName = "Label";

Label.propTypes = {
  htmlFor: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

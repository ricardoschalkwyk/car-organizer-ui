import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const Checkbox = ({ onChange, className, ...props }) => {
  return (
    <input
      className={clsx("h-4 w-4", className)}
      type="checkbox"
      onChange={(e) => {
        onChange?.(e);
      }}
      {...props}
    />
  );
};

Checkbox.propTypes = {
  onChange: PropTypes.func,
  className: PropTypes.string,
};

export default Checkbox;

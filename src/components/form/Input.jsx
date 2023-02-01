import clsx from "clsx";
import React from "react";

function Input({
  type = "text",
  value,
  placeholder,
  onChange,
  label,
  className,
  tiny = false,
  ...props
}) {
  return (
    <>
      {label && (
        <div className="mb-2">
          <label>{label}:</label>
        </div>
      )}
      <input
        className={clsx(
          "rounded w-full",
          tiny ? "py-0 px-2" : "py-2 px-3",
          className
        )}
        type={type}
        value={value}
        placeholder={placeholder}
        required
        onChange={(e) => {
          onChange?.(e);
        }}
        {...props}
      />
    </>
  );
}

export default Input;

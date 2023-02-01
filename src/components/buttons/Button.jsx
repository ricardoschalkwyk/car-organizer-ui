import React from "react";
import clsx from "clsx";

// This component is for a dianamic Button component.

function Button({
  className = "",
  children,
  type = "button",
  onClick,
  disabled,
  active = false,
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={clsx(
        "px-3 py-1 rounded hover:bg-neutral-900 text-white flex items-center gap-1",
        disabled && "cursor-not-allowed bg-slate-600 hover:bg-slate-600",
        active ? "bg-green-500" : "bg-slate-700",
        className
      )}
      onClick={(e) => {
        onClick?.(e);
      }}
    >
      {children}
    </button>
  );
}

export default Button;

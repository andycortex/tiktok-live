import React from "react";

export default function Label({
  children,
  htmlFor,
  className = "",
  required = false,
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium leading-6 text-gray-900 mb-2 ${className}`}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}

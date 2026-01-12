import React from "react";

export default function TextArea({
  label,
  id,
  className = "",
  containerClassName = "",
  required = false,
  rows = 4,
  ...props
}) {
  return (
    <div className={containerClassName}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium leading-6 text-gray-900 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        className={`block w-full rounded-lg border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6 ${className}`}
        required={required}
        {...props}
      />
    </div>
  );
}

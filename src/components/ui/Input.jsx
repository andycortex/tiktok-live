import React from "react";

export const Input = ({
  icon: Icon,
  label,
  id,
  className = "",
  containerClassName = "",
  required,
  ...props
}) => {
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
      <div className="relative">
        {Icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        )}
        <input
          id={id}
          className={`block w-full rounded-lg border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6 ${
            Icon ? "pl-10" : "pl-3"
          } ${className}`}
          required={required}
          {...props}
        />
      </div>
    </div>
  );
};

import React from "react";

export const Input = ({
  icon: Icon,
  className = "",
  containerClassName = "",
  ...props
}) => {
  return (
    <div className={`relative ${containerClassName}`}>
      {Icon && (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
      )}
      <input
        className={`block w-full rounded-lg border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6 ${
          Icon ? "pl-10" : "pl-3"
        } ${className}`}
        {...props}
      />
    </div>
  );
};

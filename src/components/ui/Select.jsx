import React from "react";
import { ChevronDown } from "lucide-react";

export default function Select({
  label,
  id,
  options = [],
  value,
  onChange,
  className = "",
  containerClassName = "",
  required = false,
  placeholder = "Select an option",
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
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={onChange}
          className={`block w-full rounded-lg border-0 py-2.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6 appearance-none bg-white ${className}`}
          required={required}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <ChevronDown className="h-4 w-4 text-gray-400" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

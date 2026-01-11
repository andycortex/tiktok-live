import React from "react";

export const Checkbox = ({ className = "", ...props }) => {
  return (
    <input
      type="checkbox"
      className={`h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500 ${className}`}
      {...props}
    />
  );
};

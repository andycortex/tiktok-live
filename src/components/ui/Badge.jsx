import React from "react";

export const Badge = ({
  children,
  variant = "neutral",
  className = "",
  hasDot = true,
}) => {
  const variants = {
    success: "bg-emerald-50 text-emerald-700", // Green for Active
    warning: "bg-amber-50 text-amber-700", // Yellow for Stock Low
    danger: "bg-red-50 text-red-700", // Red for Sold Out
    info: "bg-sky-50 text-sky-700", // Blue for Public
    neutral: "bg-gray-50 text-gray-600", // Gray for Private
    purple: "bg-purple-50 text-purple-700",
  };

  const dotColors = {
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    danger: "bg-red-500",
    info: "bg-sky-500",
    neutral: "bg-gray-400",
    purple: "bg-purple-500",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        variants[variant] || variants.neutral
      } ${className}`}
    >
      {hasDot && (
        <span
          className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
            dotColors[variant] || dotColors.neutral
          }`}
        />
      )}
      {children}
    </span>
  );
};

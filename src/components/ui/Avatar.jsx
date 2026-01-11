import React from "react";

export const Avatar = ({
  src,
  alt = "",
  initials,
  size = "md",
  shape = "circle",
  className = "",
}) => {
  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-lg",
  };

  const shapeClasses = {
    circle: "rounded-full",
    square: "rounded-lg",
  };

  // Generate random pastel background based on initials if no image
  const bgColors = [
    "bg-red-100 text-red-700",
    "bg-green-100 text-green-700",
    "bg-blue-100 text-blue-700",
    "bg-yellow-100 text-yellow-700",
    "bg-purple-100 text-purple-700",
    "bg-pink-100 text-pink-700",
    "bg-orange-100 text-orange-700",
  ];

  const randomColor = initials
    ? bgColors[initials.charCodeAt(0) % bgColors.length]
    : "bg-gray-100 text-gray-500";

  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden ${
        sizeClasses[size] || sizeClasses.md
      } ${shapeClasses[shape] || shapeClasses.circle} ${
        !src ? randomColor : ""
      } ${className}`}
    >
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <span className="font-medium uppercase">{initials || "?"}</span>
      )}
    </div>
  );
};

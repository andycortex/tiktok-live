import React, { Fragment } from "react";
import { X } from "lucide-react";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
}) {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div
        className={`relative w-full ${sizeClasses[size]} bg-white rounded-xl shadow-2xl ring-1 ring-gray-200 transform transition-all p-6`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 leading-none">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full p-1 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-6">{children}</div>

        {footer && <div className="flex justify-end gap-3">{footer}</div>}
      </div>
    </div>
  );
}

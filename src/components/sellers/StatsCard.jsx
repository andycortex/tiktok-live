import React from "react";

export const StatsCard = ({
  label,
  value,
  valueColor = "text-gray-900",
  className = "",
}) => {
  return (
    <div
      className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-auto sm:h-32 ${className}`}
    >
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
        {label}
      </div>
      <div className={`text-3xl font-bold ${valueColor}`}>{value}</div>
    </div>
  );
};

import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

export const StatsCard = ({
  label,
  value,
  valueColor = "text-gray-900",
  trend,
  trendDirection = "up",
  trendText,
  className = "",
}) => {
  return (
    <div
      className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-auto sm:h-36 ${className}`}
    >
      <div>
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          {label}
        </div>
        <div className={`text-4xl font-bold ${valueColor} mb-4`}>{value}</div>
      </div>

      {trend && (
        <div
          className={`text-sm flex items-center ${
            trendDirection === "up" ? "text-emerald-500" : "text-red-500"
          }`}
        >
          {trendDirection === "up" ? (
            <ArrowUp className="h-4 w-4 mr-1" />
          ) : (
            <ArrowDown className="h-4 w-4 mr-1" />
          )}
          <span className="font-medium mr-1">{trend}</span>
          <span className="text-gray-400 font-normal">{trendText}</span>
        </div>
      )}

      {/* For cards without trend, maybe some other info or just empty spacing to keep height consistent if needed, 
          but flex justify-between handles spacing naturally. */}
      {!trend && trendText && (
        <div className="text-sm text-gray-400">{trendText}</div>
      )}
    </div>
  );
};

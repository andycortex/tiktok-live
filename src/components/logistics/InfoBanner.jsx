import React from "react";
import { Lightbulb } from "lucide-react";

export const InfoBanner = ({ title, description, className = "" }) => {
  return (
    <div
      className={`bg-sky-50 border border-sky-100 rounded-xl p-4 flex items-start gap-4 ${className}`}
    >
      <div className="bg-white p-2 rounded-lg shadow-sm shrink-0">
        <Lightbulb className="h-5 w-5 text-amber-400 fill-amber-400" />
      </div>
      <div>
        <h3 className="text-sm font-bold text-sky-900 mb-1">{title}</h3>
        <p className="text-sm text-sky-700 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

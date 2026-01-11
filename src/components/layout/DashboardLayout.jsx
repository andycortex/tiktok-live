import React from "react";
import { Avatar } from "@/components/ui/Avatar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#F8F9FA] p-4 lg:p-8">
      {/* Top Bar - mocked as per image top right */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-orange-500">TapTap</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-semibold text-gray-900">Mi Tienda</div>
            <div className="text-xs text-gray-500">admin@mitienda.com</div>
          </div>
          <Avatar initials="MT" className="bg-orange-500 text-white" />
        </div>
      </div>
      <main className="max-w-[1400px] mx-auto">{children}</main>
    </div>
  );
}

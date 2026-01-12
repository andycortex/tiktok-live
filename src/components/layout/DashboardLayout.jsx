"use client";

import React, { useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Sidebar } from "./Sidebar";
import { Menu } from "lucide-react";
import Button from "@/components/ui/Button";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="lg:ml-64 min-h-screen flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-100 sticky top-0 z-20 px-4 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-gray-500"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={20} />
            </Button>
            {/* Breadcrumbs or Page Title could go here safely if needed, but per design usually empty or search */}
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-semibold text-gray-900">
                Mi Tienda
              </div>
              <div className="text-xs text-gray-500">admin@mitienda.com</div>
            </div>
            <Avatar initials="MT" className="bg-orange-500 text-white" />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-8 max-w-[1600px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

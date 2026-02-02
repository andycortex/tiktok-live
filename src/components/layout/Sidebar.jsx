"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import {
  Package,
  Users,
  TrendingUp,
  ShoppingCart,
  Truck,
  Tv,
  X,
  LogOut,
} from "lucide-react";
import Button from "@/components/ui/Button";

const menuItems = [
  { href: "/dashboard/products", label: "Productos", icon: Package },
  // { href: "/dashboard/sellers", label: "Vendedores", icon: Users },
  { href: "/dashboard/sales", label: "Ventas", icon: TrendingUp },
  { href: "/dashboard/orders", label: "Pedidos", icon: ShoppingCart },
  { href: "/dashboard/logistics", label: "Logística", icon: Truck },
  { href: "/dashboard/affiliations", label: "Afiliados", icon: Users },
  { href: "/live", label: "Emitir Live", icon: Tv },
];

export const Sidebar = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { setUser } = useUser();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });

      if (response.ok) {
        setUser(null);
        router.push("/login"); // Redirect to login page
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white border-r border-gray-100">
      <div className="p-6 flex items-center justify-between">
        <span className="text-2xl font-bold text-orange-500">TapTap</span>
        <button
          onClick={onClose}
          className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href; // Simple exact match for now, or startsWith if needed
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-orange-50 text-orange-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
              onClick={onClose} // Close on mobile when clicked
            >
              <Icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
          icon={LogOut}
          onClick={handleLogout}
        >
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 h-screen fixed left-0 top-0 overflow-y-auto bg-white border-r border-gray-100 z-30">
        <SidebarContent />
      </div>

      {/* Mobile Overlay & Sidebar */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div
            className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl transform transition-transform duration-200 ease-in-out">
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
};

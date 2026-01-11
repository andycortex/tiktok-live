"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { SellersHeader } from "@/components/sellers/SellersHeader";
import { FilterTabs } from "@/components/sellers/FilterTabs";
import { VendorTable } from "@/components/sellers/VendorTable";
import { Input } from "@/components/ui/Input";
import { Search } from "lucide-react";

const mockVendors = [
  {
    id: "1",
    initials: "ML",
    color: "bg-indigo-500", // Or a map of specific colors if needed
    name: "María López",
    joinDate: "Ene 2024",
    status: "active",
    sales: 18,
    totalAmount: "Bs 2450",
    commission: "Bs 368",
    phone: "+591 7123 4567",
    email: "maria.lopez@email.com",
  },
  {
    id: "2",
    initials: "CR",
    color: "bg-pink-500",
    name: "Carlos Ramos",
    joinDate: "Feb 2024",
    status: "active",
    sales: 15,
    totalAmount: "Bs 1890",
    commission: "Bs 284",
    phone: "+591 7234 5678",
    email: "carlos.ramos@email.com",
  },
  {
    id: "3",
    initials: "AF",
    color: "bg-emerald-600",
    name: "Ana Flores",
    joinDate: "Mar 2024",
    status: "active",
    sales: 22,
    totalAmount: "Bs 3150",
    commission: "Bs 473",
    phone: "+591 7345 6789",
    email: "ana.flores@email.com",
  },
];

const filters = [
  { id: "all", label: "Todos" },
  { id: "active", label: "Activos" },
  { id: "inactive", label: "Inactivos" },
  { id: "top", label: "Top Performers" },
];

export default function SellersPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <DashboardLayout>
      <SellersHeader />

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
        {/* Optional background for filter bar purely based on design structure sometimes having a wrapper */}
        <div className="flex flex-col gap-4">
          <Input
            icon={Search}
            placeholder="Buscar vendedores..."
            className="bg-gray-50 border-0 ring-0 focus:ring-0" // Simulating the clean look in image
            containerClassName="mb-2"
          />
          <FilterTabs
            filters={filters}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>
      </div>

      <VendorTable vendors={mockVendors} />
    </DashboardLayout>
  );
}

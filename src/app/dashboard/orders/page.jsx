"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { OrdersHeader } from "@/components/orders/OrdersHeader";
import { OrderTable } from "@/components/orders/OrderTable";
import { FilterTabs } from "@/components/sellers/FilterTabs";
import { Input } from "@/components/ui/Input";
import { Search } from "lucide-react";

const mockOrders = [
  {
    id: "PED-001",
    date: "26 Dic 2024, 10:30",
    customerName: "Juan Pérez",
    customerPhone: "+591 7123-4567",
    products: [{ name: "iPhone 14 Pro", quantity: "x1" }],
    paymentPending: true,
    sellerName: "María López",
    location: "Santa Cruz Centro",
    shippingCost: "Bs 15",
    total: "Bs 1314",
    status: "pendiente",
  },
  {
    id: "PED-002",
    date: "26 Dic 2024, 09:15",
    customerName: "María Silva",
    customerPhone: "+591 7234-5678",
    products: [
      { name: "Polera Premium", quantity: "x2" },
      { name: "Gorra Premium", quantity: "x1" },
    ],
    paymentPending: false,
    sellerName: "Carlos Ramos",
    location: "Cochabamba",
    shippingCost: "Bs 25",
    total: "Bs 140",
    status: "confirmado",
  },
  {
    id: "PED-003",
    date: "25 Dic 2024, 18:45",
    customerName: "Pedro Gómez",
    customerPhone: "+591 7345-6789",
    products: [{ name: "Zapatillas Nike", quantity: "x1" }],
    paymentPending: false,
    sellerName: "Ana Flores",
    location: "La Paz",
    shippingCost: "Bs 35",
    total: "Bs 155",
    status: "en_camino",
  },
  {
    id: "PED-004",
    date: "25 Dic 2024, 16:20",
    customerName: "Laura Torres",
    customerPhone: "+591 7456-7890",
    products: [{ name: "AirPods Pro", quantity: "x1" }],
    paymentPending: false,
    sellerName: "Pedro Sánchez",
    location: "Santa Cruz Centro",
    shippingCost: "Bs 15",
    total: "Bs 264",
    status: "entregado",
  },
  {
    id: "PED-005",
    date: "26 Dic 2024, 11:00",
    customerName: "Diego Castro",
    customerPhone: "+591 7567-8901",
    products: [{ name: "MacBook Air M2", quantity: "x1" }],
    paymentPending: true,
    sellerName: "Lucia Vargas",
    location: "Tarija",
    shippingCost: "Bs 30",
    total: "Bs 1529",
    status: "pendiente",
  },
  {
    id: "PED-006",
    date: "26 Dic 2024, 08:30",
    customerName: "Sofía Medina",
    customerPhone: "+591 7678-9012",
    products: [
      { name: "Apple Watch S8", quantity: "x1" },
      { name: "Magic Keyboard", quantity: "x1" },
    ],
    paymentPending: false,
    sellerName: "Roberto Cruz",
    location: "Santa Cruz Centro",
    shippingCost: "Bs 15",
    total: "Bs 623",
    status: "confirmado",
  },
];

const filters = [
  { id: "all", label: "Todos" },
  { id: "pendiente", label: "Pendientes" },
  { id: "confirmado", label: "Confirmados" },
  { id: "en_camino", label: "En Camino" },
  { id: "entregado", label: "Entregados" },
  { id: "cancelado", label: "Cancelados" },
];

export default function OrdersPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <DashboardLayout>
      <OrdersHeader />

      <div className="mb-6 space-y-4">
        <Input
          icon={Search}
          placeholder="Buscar por cliente, producto o código..."
          className="bg-white border-0 shadow-sm"
        />
        <FilterTabs
          filters={filters}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>

      <OrderTable orders={mockOrders} />
    </DashboardLayout>
  );
}

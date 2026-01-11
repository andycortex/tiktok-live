"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/sellers/StatsCard";
import { SoldProductTable } from "@/components/sales/SoldProductTable";

const mockSales = [
  {
    id: "1",
    productName: "Apple Watch S8",
    productCode: "PROD-004",
    productImage: "",
    buyerName: "Roberto Cruz",
    buyerPhone: "+591 7901-2345",
    sellerName: "Ana Flores",
    quantity: 3,
    price: "Bs 2124",
    date: "25 dic 2025",
    status: "entregado",
  },
  {
    id: "2",
    productName: "Magic Keyboard",
    productCode: "PROD-006",
    productImage: "",
    buyerName: "Carlos Ramos",
    buyerPhone: "+591 7345-6789",
    sellerName: "Carlos Ramos",
    quantity: 1,
    price: "Bs 736",
    date: "24 dic 2025",
    status: "pendiente",
  },
  {
    id: "3",
    productName: "AirPods Pro",
    productCode: "PROD-003",
    productImage: "",
    buyerName: "Pedro Gómez",
    buyerPhone: "+591 7567-8901",
    sellerName: "Ana Flores",
    quantity: 2,
    price: "Bs 1594",
    date: "23 dic 2025",
    status: "en_camino",
  },
  {
    id: "4",
    productName: "iPhone 14 Pro",
    productCode: "PROD-001",
    productImage: "",
    buyerName: "Roberto Cruz",
    buyerPhone: "+591 7901-2345",
    sellerName: "Carlos Ramos",
    quantity: 2,
    price: "Bs 144",
    date: "23 dic 2025",
    status: "pendiente",
  },
  {
    id: "5",
    productName: "Cámara Canon",
    productCode: "PROD-013",
    productImage: "",
    buyerName: "Sofía Medina",
    buyerPhone: "+591 7890-1234",
    sellerName: "Carlos Ramos",
    quantity: 2,
    price: "Bs 1904",
    date: "21 dic 2025",
    status: "entregado",
  },
];

export default function SalesPage() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          label="Ventas del Mes"
          value="Bs 12,450"
          valueColor="text-orange-500"
          trend="24%"
          trendDirection="up"
          trendText="vs mes anterior"
        />
        <StatsCard
          label="Productos Vendidos"
          value="67"
          trend="18%"
          trendDirection="up"
          trendText="vs mes anterior"
        />
        <StatsCard
          label="Pedidos Activos"
          value="8"
          valueColor="text-blue-500"
          trend="3"
          trendDirection="up" // Using generic trend coloring logic, though '3 pendientes' is context specific
          trendText="pendientes de entrega"
          // Custom override for this specific green/text if needed:
          // In design "3 pendientes de entrega" is green.
        />
        <StatsCard
          label="Ticket Promedio"
          value="Bs 186"
          trend="12%"
          trendDirection="up"
          trendText="vs mes anterior"
        />
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Productos Vendidos</h2>
      </div>

      <SoldProductTable sales={mockSales} />
    </DashboardLayout>
  );
}

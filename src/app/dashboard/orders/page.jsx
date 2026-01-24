"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { OrdersHeader } from "@/components/orders/OrdersHeader";
import { OrderTable } from "@/components/orders/OrderTable";
import Pagination from "@/components/ui/Pagination";
import { FilterTabs } from "@/components/sellers/FilterTabs";
import { Input } from "@/components/ui/Input";
import { Search } from "lucide-react";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders");
        if (response.ok) {
          const data = await response.json();
          const mappedOrders = data.map((order) => ({
            id: `PED-${order.id.toString().padStart(3, "0")}`,
            rawId: order.id,
            date: new Date(order.createdAt).toLocaleDateString("es-ES", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
            customerName: order.customerName,
            customerPhone: order.customerPhone,
            products: order.items.map((item) => ({
              name: item.product.name,
              quantity: `x${item.quantity}`,
            })),
            paymentPending: false, // You might want to add this to schema if needed
            sellerName: order.seller
              ? `${order.seller.firstName} ${order.seller.lastName}`
              : "Sin vendedor",
            location: order.zone ? order.zone.name : "Sin zona",
            shippingCost: `Bs ${order.shippingCost}`,
            total: `Bs ${order.total}`,
            status: order.status,
          }));
          setOrders(mappedOrders);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Optimistic update or refetch
        setOrders((prev) =>
          prev.map((order) =>
            order.rawId === id ? { ...order, status: newStatus } : order,
          ),
        );
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.products.some((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );

    if (activeFilter === "all") return matchesSearch;
    return matchesSearch && order.status === activeFilter;
  });

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <DashboardLayout>
      <OrdersHeader />

      <div className="mb-6 space-y-4">
        <Input
          icon={Search}
          placeholder="Buscar por cliente, producto o código..."
          className="bg-white border-0 shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterTabs
          filters={filters}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>

      <OrderTable
        orders={paginatedOrders}
        isLoading={isLoading}
        onStatusChange={handleStatusChange}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={filteredOrders.length}
        itemsPerPage={itemsPerPage}
      />
    </DashboardLayout>
  );
}

"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import OrderForm from "@/components/forms/OrderForm";

export default function NewOrderPage() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Nuevo Pedido</h1>
        <p className="text-gray-500 mt-1">
          Crea un pedido manual para un cliente
        </p>
      </div>
      <OrderForm />
    </DashboardLayout>
  );
}

"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SellerForm from "@/components/forms/SellerForm";

export default function NewSellerPage() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Nuevo Vendedor</h1>
        <p className="text-gray-500 mt-1">
          Registra un nuevo miembro en tu equipo de ventas
        </p>
      </div>
      <SellerForm />
    </DashboardLayout>
  );
}

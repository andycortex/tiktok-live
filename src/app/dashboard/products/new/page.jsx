"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ProductForm from "@/components/forms/ProductForm";

export default function NewProductPage() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Nuevo Producto</h1>
        <p className="text-gray-500 mt-1">
          Agrega un nuevo producto a tu catálogo
        </p>
      </div>
      <ProductForm />
    </DashboardLayout>
  );
}

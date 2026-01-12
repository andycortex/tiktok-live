"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ZoneForm from "@/components/forms/ZoneForm";

export default function NewZonePage() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Nueva Zona de Envío
        </h1>
        <p className="text-gray-500 mt-1">
          Configura una nueva área de cobertura
        </p>
      </div>
      <ZoneForm />
    </DashboardLayout>
  );
}

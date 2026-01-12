import React from "react";
import Button from "../ui/Button";
import { StatsCard } from "./StatsCard";
import { Plus } from "lucide-react";

export const SellersHeader = () => {
  return (
    <div className="space-y-6 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mis Vendedores</h1>
          <p className="text-gray-500 mt-1">Gestiona tu equipo de ventas</p>
        </div>
        <div>
          <Button
            variant="primary"
            icon={Plus}
            className="w-full sm:w-auto justify-center"
          >
            Asignar Vendedor
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard label="Total Vendedores" value="12" />
        <StatsCard label="Activos" value="9" />
        <StatsCard
          label="Ventas del Mes"
          value="Bs 8,450"
          valueColor="text-orange-500"
        />
        <StatsCard label="Comisiones Pagadas" value="Bs 1,268" />
      </div>
    </div>
  );
};

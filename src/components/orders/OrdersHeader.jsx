import React from "react";
import { StatsCard } from "../sellers/StatsCard";
import Button from "../ui/Button";
import Link from "next/link";
import { Plus } from "lucide-react";

export const OrdersHeader = () => {
  return (
    <div className="space-y-6 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pedidos</h1>
          <p className="text-gray-500 mt-1">
            Gestiona todos tus pedidos confirmados
          </p>
        </div>
        <div>
          <Link href="/dashboard/orders/new">
            <Button variant="primary" icon={Plus}>
              Nuevo Pedido
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard label="Pendientes" value="8" valueColor="text-orange-500" />
        <StatsCard label="En Camino" value="5" />
        <StatsCard label="Entregados Hoy" value="12" />
        <StatsCard
          label="Total del Día"
          value="Bs 2,450"
          valueColor="text-orange-500"
        />
      </div>
    </div>
  );
};

"use client";

import React from "react";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Button from "@/components/ui/Button";
import { InfoBanner } from "@/components/logistics/InfoBanner";
import { ZoneCard } from "@/components/logistics/ZoneCard";
import { Input } from "@/components/ui/Input";
import Pagination from "@/components/ui/Pagination";
import { Plus, Map, Building2, Mountain, Search } from "lucide-react";

const mockZones = [
  {
    id: "1",
    name: "Santa Cruz Centro",
    region: "Santa Cruz",
    price: "Bs 15",
    icon: <Map className="h-6 w-6 text-blue-500" />,
    iconBg: "bg-blue-50",
    instructions:
      "Llamar 15 minutos antes de llegar. Entregar en portería o directamente al comprador.",
    schedule: "Lunes a Sábado: 9:00 - 18:00",
    deliveryTime: "Entrega el mismo día",
    coverage: "Planes 1, 2, 3 y 4to anillo",
  },
  {
    id: "2",
    name: "Cochabamba",
    region: "Cochabamba",
    price: "Bs 25",
    icon: <Building2 className="h-6 w-6 text-emerald-500" />,
    iconBg: "bg-emerald-50",
    instructions:
      "Coordinar con el comprador el día anterior. Envío por agencia de transporte.",
    schedule: "Martes y Jueves: 14:00 - 17:00",
    deliveryTime: "2-3 días hábiles",
    coverage: "Zona central y norte",
  },
  {
    id: "3",
    name: "La Paz",
    region: "La Paz",
    price: "Bs 35",
    icon: <Mountain className="h-6 w-6 text-purple-500" />,
    iconBg: "bg-purple-50",
    instructions:
      "Envío por agencia de encomiendas. El comprador retira en oficina de la agencia.",
    schedule: "Lunes a Viernes: Todo el día",
    deliveryTime: "3-5 días hábiles",
    coverage: "Ciudad de La Paz y El Alto",
  },
];

export default function LogisticsPage() {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredZones = mockZones.filter(
    (zone) =>
      zone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      zone.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 6; // Grid view, slightly different count logic usually
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = Math.ceil(filteredZones.length / itemsPerPage);
  const paginatedZones = filteredZones.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Datos Logísticos</h1>
        <p className="text-gray-500 mt-1">
          Configura tus zonas de entrega y puntos de venta
        </p>
      </div>

      <InfoBanner
        title="Configura tus opciones de entrega"
        description="Define las ciudades donde realizas envíos, los costos, horarios y tiempos de entrega. Esta información será visible para tus vendedores y compradores."
        className="mb-10"
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Zonas de Envío</h2>
          <p className="text-sm text-gray-500">
            Lugares donde realizas entregas
          </p>
        </div>
        <Link href="/dashboard/logistics/new">
          <Button variant="primary" icon={Plus}>
            Nueva Zona
          </Button>
        </Link>
      </div>

      <div className="mb-6 max-w-md">
        <Input
          placeholder="Buscar zona..."
          icon={Search}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedZones.map((zone) => (
          <ZoneCard key={zone.id} zone={zone} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={filteredZones.length}
        itemsPerPage={itemsPerPage}
        className="mt-8 border-t-0 px-0"
      />
    </DashboardLayout>
  );
}

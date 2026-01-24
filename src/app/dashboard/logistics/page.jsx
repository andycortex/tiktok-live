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
import Modal from "@/components/ui/Modal";

export default function LogisticsPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [zones, setZones] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [zoneToDelete, setZoneToDelete] = React.useState(null);

  const fetchZones = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/zones");
      if (response.ok) {
        const data = await response.json();
        setZones(data);
      }
    } catch (error) {
      console.error("Failed to fetch zones:", error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchZones();
  }, []);

  const confirmDelete = (id) => {
    setZoneToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!zoneToDelete) return;

    try {
      const response = await fetch(`/api/zones/${zoneToDelete}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchZones();
        setDeleteModalOpen(false);
        setZoneToDelete(null);
      } else {
        alert("Error al eliminar la zona");
      }
    } catch (error) {
      console.error("Error deleting zone:", error);
    }
  };

  const filteredZones = zones.filter(
    (zone) =>
      zone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      zone.region.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const itemsPerPage = 6; // Grid view, slightly different count logic usually
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = Math.ceil(filteredZones.length / itemsPerPage);
  const paginatedZones = filteredZones.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
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
        {isLoading ? (
          <div className="col-span-full h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        ) : filteredZones.length === 0 ? (
          <div className="col-span-full py-12 text-center text-gray-500">
            No hay zonas registradas.
          </div>
        ) : (
          paginatedZones.map((zone) => (
            <ZoneCard key={zone.id} zone={zone} onDelete={confirmDelete} />
          ))
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={filteredZones.length}
        itemsPerPage={itemsPerPage}
        className="mt-8 border-t-0 px-0"
      />

      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Eliminar Zona"
        footer={
          <>
            <Button variant="ghost" onClick={() => setDeleteModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              variant="danger"
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleDelete}
            >
              Eliminar
            </Button>
          </>
        }
      >
        <p className="text-gray-600">
          ¿Estás seguro de que deseas eliminar esta zona? Esta acción no se
          puede deshacer.
        </p>
      </Modal>
    </DashboardLayout>
  );
}

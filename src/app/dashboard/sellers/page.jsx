"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { SellersHeader } from "@/components/sellers/SellersHeader";
import { FilterTabs } from "@/components/sellers/FilterTabs";
import { VendorTable } from "@/components/sellers/VendorTable";
import Pagination from "@/components/ui/Pagination";
import { Input } from "@/components/ui/Input";
import { Search } from "lucide-react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

export default function SellersPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [vendors, setVendors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [vendorToDelete, setVendorToDelete] = useState(null);

  const fetchVendors = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/sellers");
      if (response.ok) {
        const data = await response.json();
        // Map DB data to UI structure
        const mappedData = data.map((seller) => ({
          id: seller.id,
          initials: `${seller.firstName[0]}${seller.lastName[0]}`.toUpperCase(),
          color: "bg-orange-500", // Default color
          name: `${seller.firstName} ${seller.lastName}`,
          joinDate: new Date(seller.createdAt).toLocaleDateString("es-ES", {
            month: "short",
            year: "numeric",
          }),
          status: seller.status,
          sales: 0, // Mock
          totalAmount: "Bs 0", // Mock
          commission: `${seller.commission}%`,
          phone: seller.phone,
          email: seller.email,
        }));
        setVendors(mappedData);
      }
    } catch (error) {
      console.error("Failed to fetch sellers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const confirmDelete = (id) => {
    setVendorToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!vendorToDelete) return;

    try {
      const response = await fetch(`/api/sellers/${vendorToDelete}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchVendors(); // Refresh list
        setDeleteModalOpen(false);
        setVendorToDelete(null);
      } else {
        alert("Error al eliminar el vendedor");
      }
    } catch (error) {
      console.error("Error deleting seller:", error);
    }
  };

  const filters = [
    { id: "all", label: "Todos" },
    { id: "active", label: "Activos" },
    { id: "inactive", label: "Inactivos" },
    { id: "top", label: "Top Performers" },
  ];

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeFilter === "all") return matchesSearch;
    if (activeFilter === "top") return matchesSearch && vendor.sales > 20; // Mock logic
    return matchesSearch && vendor.status === activeFilter;
  });

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredVendors.length / itemsPerPage);
  const paginatedVendors = filteredVendors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <DashboardLayout>
      <SellersHeader />

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
        {/* Optional background for filter bar purely based on design structure sometimes having a wrapper */}
        <div className="flex flex-col gap-4">
          <Input
            icon={Search}
            placeholder="Buscar vendedores..."
            className="bg-gray-50 border-0 ring-0 focus:ring-0" // Simulating the clean look in image
            containerClassName="mb-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FilterTabs
            filters={filters}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>
      </div>

      <VendorTable
        vendors={paginatedVendors}
        isLoading={isLoading}
        onDelete={confirmDelete}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={filteredVendors.length}
        itemsPerPage={itemsPerPage}
      />

      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Eliminar Vendedor"
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
          ¿Estás seguro de que deseas eliminar este vendedor? Esta acción no se
          puede deshacer.
        </p>
      </Modal>
    </DashboardLayout>
  );
}

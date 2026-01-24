"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { DashboardHeader } from "@/components/products/DashboardHeader";
import { ProductTable } from "@/components/products/ProductTable";
import Pagination from "@/components/ui/Pagination";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [productToDelete, setProductToDelete] = React.useState(null);
  const [products, setProducts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/products");
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  const confirmDelete = (id) => {
    setProductToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!productToDelete) return;

    try {
      const response = await fetch(`/api/products/${productToDelete}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchProducts(); // Refresh list
        setDeleteModalOpen(false);
        setProductToDelete(null);
      } else {
        alert("Error al eliminar el producto");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.code.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <DashboardLayout>
      <DashboardHeader onSearch={setSearchTerm} />
      <ProductTable
        products={paginatedProducts}
        isLoading={isLoading}
        onDelete={confirmDelete}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={filteredProducts.length}
        itemsPerPage={itemsPerPage}
      />

      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Eliminar Producto"
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
          ¿Estás seguro de que deseas eliminar este producto? Esta acción no se
          puede deshacer.
        </p>
      </Modal>
    </DashboardLayout>
  );
}

"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { DashboardHeader } from "@/components/products/DashboardHeader";
import { ProductTable } from "@/components/products/ProductTable";
import Pagination from "@/components/ui/Pagination";

const mockProducts = [
  {
    id: "1",
    name: "iPhone 14 Pro",
    code: "PROD-001",
    status: "active",
    price: 1299,
    vendorPercent: 10,
    stock: 15,
    visibility: "public",
  },
  {
    id: "2",
    name: "MacBook Air M2",
    code: "PROD-002",
    status: "active",
    price: 1499,
    vendorPercent: 8,
    stock: 8,
    visibility: "private",
  },
  {
    id: "3",
    name: "AirPods Pro",
    code: "PROD-003",
    status: "low_stock",
    price: 249,
    vendorPercent: 15,
    stock: 3,
    visibility: "public",
  },
  {
    id: "4",
    name: "Apple Watch S8",
    code: "PROD-004",
    status: "active",
    price: 429,
    vendorPercent: 12,
    stock: 12,
    visibility: "private",
  },
  {
    id: "5",
    name: "iPad Air",
    code: "PROD-005",
    status: "out_of_stock",
    price: 599,
    vendorPercent: 10,
    stock: 0,
    visibility: "private",
  },
];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredProducts = mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <DashboardLayout>
      <DashboardHeader onSearch={setSearchTerm} />
      <ProductTable products={paginatedProducts} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={filteredProducts.length}
        itemsPerPage={itemsPerPage}
      />
    </DashboardLayout>
  );
}

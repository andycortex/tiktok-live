"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ProductForm from "@/components/forms/ProductForm";
import { useParams, useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          console.error("Failed to fetch product");
          router.push("/dashboard/products");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, router]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!product) return null;

  return (
    <DashboardLayout>
      <div className="mb-6">
        <Button
          variant="ghost"
          className="mb-4 pl-0 hover:bg-transparent hover:text-orange-600"
          icon={ArrowLeft}
          onClick={() => router.back()}
        >
          Volver
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Editar Producto</h1>
          <p className="text-sm text-gray-500">
            Actualiza la información de tu producto.
          </p>
        </div>
      </div>

      <ProductForm initialData={product} />
    </DashboardLayout>
  );
}

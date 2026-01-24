"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SellerForm from "@/components/forms/SellerForm";
import { useParams, useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";

export default function EditSellerPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const [seller, setSeller] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const response = await fetch(`/api/sellers/${id}`);
        if (response.ok) {
          const data = await response.json();
          setSeller(data);
        } else {
          console.error("Failed to fetch seller");
          router.push("/dashboard/sellers");
        }
      } catch (error) {
        console.error("Error fetching seller:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchSeller();
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

  if (!seller) return null;

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
          <h1 className="text-2xl font-bold text-gray-900">Editar Vendedor</h1>
          <p className="text-sm text-gray-500">
            Actualiza la información del vendedor.
          </p>
        </div>
      </div>

      <SellerForm initialData={seller} />
    </DashboardLayout>
  );
}

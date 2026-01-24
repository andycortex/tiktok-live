"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ZoneForm from "@/components/forms/ZoneForm";
import { useParams, useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";

export default function EditZonePage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const [zone, setZone] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchZone = async () => {
      try {
        const response = await fetch(`/api/zones/${id}`);
        if (response.ok) {
          const data = await response.json();
          setZone(data);
        } else {
          console.error("Failed to fetch zone");
          router.push("/dashboard/logistics");
        }
      } catch (error) {
        console.error("Error fetching zone:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchZone();
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

  if (!zone) return null;

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
          <h1 className="text-2xl font-bold text-gray-900">Editar Zona</h1>
          <p className="text-sm text-gray-500">
            Actualiza los detalles de entrega de esta zona.
          </p>
        </div>
      </div>

      <ZoneForm initialData={zone} />
    </DashboardLayout>
  );
}

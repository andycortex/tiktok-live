"use client";

import React, { useState } from "react";
import { Input } from "../ui/Input";
import Button from "../ui/Button";
import Select from "../ui/Select";
import { Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SellerForm({ initialData }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    status: initialData?.status || "active",
    commission: initialData?.commission || "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id, value) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const url = initialData ? `/api/sellers/${initialData.id}` : "/api/sellers";
    const method = initialData ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save seller");
      }

      router.push("/dashboard/sellers");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8"
    >
      <div className="space-y-8">
        <div>
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Información del Vendedor
          </h3>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Datos personales y de contacto del nuevo vendedor.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
          <Input
            id="firstName"
            label="Nombres"
            placeholder="Ej: Juan"
            required
            value={formData.firstName}
            onChange={handleChange}
          />
          <Input
            id="lastName"
            label="Apellidos"
            placeholder="Ej: Pérez"
            required
            value={formData.lastName}
            onChange={handleChange}
          />

          <Input
            id="email"
            label="Correo Electrónico"
            type="email"
            placeholder="juan@ejemplo.com"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            id="phone"
            label="Teléfono / WhatsApp"
            type="tel"
            placeholder="+591 70000000"
            required
            value={formData.phone}
            onChange={handleChange}
          />

          <Select
            id="status"
            label="Estado"
            options={[
              { value: "active", label: "Activo" },
              { value: "inactive", label: "Inactivo" },
            ]}
            required
            value={formData.status}
            onChange={(e) => handleSelectChange("status", e.target.value)}
          />
          <Input
            id="commission"
            label="Comisión Base (%)"
            type="number"
            placeholder="Ej: 10"
            value={formData.commission}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center justify-end gap-x-4 border-t border-gray-100 pt-6">
          <Link
            href="/dashboard/sellers"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancelar
          </Link>
          <Button type="submit" isLoading={isLoading} icon={Save}>
            Guardar Vendedor
          </Button>
        </div>
      </div>
    </form>
  );
}

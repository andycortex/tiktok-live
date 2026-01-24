"use client";

import React, { useState } from "react";
import { Input } from "../ui/Input";
import Button from "../ui/Button";
import TextArea from "../ui/TextArea";
import { Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ZoneForm({ initialData }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    region: initialData?.region || "",
    price: initialData?.price || "",
    deliveryTime: initialData?.deliveryTime || "",
    instructions: initialData?.instructions || "",
    schedule: initialData?.schedule || "",
    coverage: initialData?.coverage || "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const url = initialData ? `/api/zones/${initialData.id}` : "/api/zones";
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
        throw new Error(data.error || "Failed to save zone");
      }

      router.push("/dashboard/logistics");
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
            Configuración de Zona
          </h3>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Define los detalles de entrega para esta zona geográfica.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
          <Input
            id="name"
            label="Nombre de la Zona"
            placeholder="Ej: Santa Cruz Centro"
            required
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            id="region"
            label="Región / Ciudad"
            placeholder="Ej: Santa Cruz"
            required
            value={formData.region}
            onChange={handleChange}
          />

          <Input
            id="price"
            label="Costo de Envío (Bs)"
            type="number"
            placeholder="15"
            required
            value={formData.price}
            onChange={handleChange}
          />
          <Input
            id="deliveryTime"
            label="Tiempo de Entrega"
            placeholder="Ej: Entrega el mismo día"
            required
            value={formData.deliveryTime}
            onChange={handleChange}
          />

          <TextArea
            id="instructions"
            label="Instrucciones"
            placeholder="Detalles de entrega..."
            value={formData.instructions}
            onChange={handleChange}
          />
          <TextArea
            id="schedule"
            label="Horario de Atención"
            placeholder="Ej: Lunes a Sábado: 9:00 - 18:00"
            value={formData.schedule}
            onChange={handleChange}
          />

          <TextArea
            id="coverage"
            label="Cobertura"
            placeholder="Ej: Planes 1 al 4to anillo"
            containerClassName="col-span-2"
            value={formData.coverage}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center justify-end gap-x-4 border-t border-gray-100 pt-6">
          <Link
            href="/dashboard/logistics"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancelar
          </Link>
          <Button type="submit" isLoading={isLoading} icon={Save}>
            Guardar Zona
          </Button>
        </div>
      </div>
    </form>
  );
}

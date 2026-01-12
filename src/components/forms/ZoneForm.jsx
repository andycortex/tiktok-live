"use client";

import React, { useState } from "react";
import { Input } from "../ui/Input";
import Button from "../ui/Button";
import TextArea from "../ui/TextArea";
import { Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ZoneForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard/logistics");
    }, 1000);
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
          <Input
            id="name"
            label="Nombre de la Zona"
            placeholder="Ej: Santa Cruz Centro"
            required
          />
          <Input
            id="region"
            label="Región / Ciudad"
            placeholder="Ej: Santa Cruz"
            required
          />

          <Input
            id="price"
            label="Costo de Envío (Bs)"
            type="number"
            placeholder="15"
            required
          />
          <Input
            id="deliveryTime"
            label="Tiempo de Entrega"
            placeholder="Ej: Entrega el mismo día"
            required
          />

          <TextArea
            id="instructions"
            label="Instrucciones"
            placeholder="Detalles de entrega..."
          />
          <TextArea
            id="schedule"
            label="Horario de Atención"
            placeholder="Ej: Lunes a Sábado: 9:00 - 18:00"
          />

          <TextArea
            id="coverage"
            label="Cobertura"
            placeholder="Ej: Planes 1 al 4to anillo"
            containerClassName="col-span-2"
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

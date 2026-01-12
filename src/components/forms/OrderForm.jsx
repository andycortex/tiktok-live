"use client";

import React, { useState } from "react";
import { Input } from "../ui/Input";
import Button from "../ui/Button";
import Select from "../ui/Select";
import TextArea from "../ui/TextArea";
import { Save, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OrderForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard/orders");
    }, 1000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8"
    >
      <div className="space-y-8">
        {/* Product Selection Mockup */}
        <div>
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Productos
          </h3>
          <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <Input
              icon={Search}
              placeholder="Buscar producto para agregar..."
              className="bg-white"
            />
            <div className="text-sm text-gray-500 text-center py-8">
              Busca y selecciona productos para armar el pedido
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-base font-semibold leading-7 text-gray-900 mb-6">
            Datos del Cliente
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
            <Input id="customerName" label="Nombre Completo" required />
            <Input id="customerPhone" label="Teléfono" required />
            <TextArea
              id="address"
              label="Dirección de Entrega"
              containerClassName="col-span-2"
              required
            />
            <Select
              id="shippingZone"
              label="Zona de Envío"
              options={[
                { value: "scz_center", label: "Santa Cruz Centro (Bs 15)" },
                { value: "scz_north", label: "Santa Cruz Norte (Bs 20)" },
              ]}
              required
            />
          </div>
        </div>

        <div>
          <h3 className="text-base font-semibold leading-7 text-gray-900 mb-6">
            Detalles del Pedido
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
            <Select
              id="seller"
              label="Vendedor Asignado"
              options={[
                { value: "ana", label: "Ana Flores" },
                { value: "carlos", label: "Carlos Ramos" },
              ]}
            />
            <Select
              id="status"
              label="Estado Inicial"
              options={[
                { value: "pending", label: "Pendiente" },
                { value: "confirmed", label: "Confirmado" },
              ]}
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-x-4 border-t border-gray-100 pt-6">
          <Link
            href="/dashboard/orders"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancelar
          </Link>
          <Button type="submit" isLoading={isLoading} icon={Save}>
            Crear Pedido
          </Button>
        </div>
      </div>
    </form>
  );
}

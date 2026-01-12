"use client";

import React, { useState } from "react";
import { Input } from "../ui/Input";
import Button from "../ui/Button";
import Select from "../ui/Select";
import { Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SellerForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard/sellers");
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
            Información del Vendedor
          </h3>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Datos personales y de contacto del nuevo vendedor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
          <Input
            id="firstName"
            label="Nombres"
            placeholder="Ej: Juan"
            required
          />
          <Input
            id="lastName"
            label="Apellidos"
            placeholder="Ej: Pérez"
            required
          />

          <Input
            id="email"
            label="Correo Electrónico"
            type="email"
            placeholder="juan@ejemplo.com"
            required
          />
          <Input
            id="phone"
            label="Teléfono / WhatsApp"
            type="tel"
            placeholder="+591 70000000"
            required
          />

          <Select
            id="status"
            label="Estado"
            options={[
              { value: "active", label: "Activo" },
              { value: "inactive", label: "Inactivo" },
            ]}
            required
          />
          <Input
            id="commission"
            label="Comisión Base (%)"
            type="number"
            placeholder="Ej: 10"
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

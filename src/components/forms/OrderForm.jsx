"use client";

import React, { useState } from "react";
import { Input } from "../ui/Input";
import Button from "../ui/Button";
import Select from "../ui/Select";
import TextArea from "../ui/TextArea";
import { Save, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

export default function OrderForm() {
  const router = useRouter();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [affiliates, setAffiliates] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedSeller, setSelectedSeller] = useState("");

  // Load owner's products on mount
  React.useEffect(() => {
    if (user) {
      fetch(`/api/products?ownerId=${user.id}&includeCount=false`)
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  // Load affiliates when product changes
  React.useEffect(() => {
    if (selectedProduct) {
      fetch(`/api/products/${selectedProduct}/affiliates`)
        .then((res) => res.json())
        .then((data) => setAffiliates(data))
        .catch((err) => console.error(err));
      setSelectedSeller(""); // Reset seller
    } else {
      setAffiliates([]);
    }
  }, [selectedProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!selectedProduct) throw new Error("Selecciona un producto");

      const orderData = {
        customerName: e.target.customerName.value,
        customerPhone: e.target.customerPhone.value,
        items: [
          {
            productId: parseInt(selectedProduct),
            quantity: parseInt(quantity),
          },
        ],
        sellerId: selectedSeller ? parseInt(selectedSeller) : null, // If empty, it's a direct sale
        zoneId: 1, // Default zone or handle selection
        shippingCost: 0,
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        router.push("/dashboard/orders");
        router.refresh();
      } else {
        const error = await res.json();
        alert("Error: " + error.error);
      }
    } catch (err) {
      console.error(err);
      alert("Error al crear el pedido");
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
        {/* Product Selection */}
        <div>
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Productos
          </h3>
          <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50 space-y-4">
            <Select
              id="productSelect"
              label="Seleccionar Producto"
              options={products.map((p) => ({
                value: p.id,
                label: `${p.name} - Bs ${p.price}`,
              }))}
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              required
            />
            {selectedProduct && (
              <Input
                id="quantity"
                label="Cantidad"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            )}
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
              label="Vendedor Asignado (Afiliado)"
              options={[
                { value: "", label: "Venta Directa (Sin afiliado)" },
                ...affiliates.map((a) => ({
                  value: a.id,
                  label: `${a.name} (${a.email})`,
                })),
              ]}
              value={selectedSeller}
              onChange={(e) => setSelectedSeller(e.target.value)}
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

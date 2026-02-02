"use client";

import React, { useState } from "react";
import { Input } from "../ui/Input";
import Button from "../ui/Button";
import Select from "../ui/Select";
import TextArea from "../ui/TextArea";
import { Upload, Save, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

export default function ProductForm({ initialData }) {
  const router = useRouter();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    code: initialData?.code || "",
    category: initialData?.category || "",
    price: initialData?.price || "",
    stock: initialData?.stock || "",
    commissionPercentage: initialData?.commissionPercentage || "0",
    visibility: initialData?.visibility || "public",
    status: initialData?.status || "active",
    description: initialData?.description || "",
    description: initialData?.description || "",
    image: initialData?.image || "",
    images: initialData?.images?.map((img) => img.url) || [], // Array of URLs
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

    const url = initialData
      ? `/api/products/${initialData.id}`
      : "/api/products";
    const method = initialData ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, ownerId: user?.id }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save product");
      }

      router.push("/dashboard/products");
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
        {/* Image Upload Section */}
        <div>
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Imágenes del Producto
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Sube hasta 5 imágenes. La primera será la portada.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {formData.images &&
              formData.images.map((url, index) => (
                <div key={index} className="relative group aspect-square">
                  <img
                    src={url}
                    alt={`Preview ${index}`}
                    className="h-full w-full object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newImages = formData.images.filter(
                        (_, i) => i !== index,
                      );
                      setFormData((prev) => ({
                        ...prev,
                        images: newImages,
                        image: newImages[0] || "",
                      }));
                    }}
                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  {index === 0 && (
                    <span className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 text-white text-xs rounded">
                      Portada
                    </span>
                  )}
                </div>
              ))}

            {(!formData.images || formData.images.length < 5) && (
              <label className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-xs text-gray-500">Subir imagen</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={async (e) => {
                    const files = Array.from(e.target.files);
                    if (files.length === 0) return;

                    setIsLoading(true);
                    try {
                      // Upload each file
                      const uploadPromises = files.map(async (file) => {
                        const formData = new FormData();
                        formData.append("file", file);
                        const res = await fetch("/api/upload", {
                          method: "POST",
                          body: formData,
                        });
                        if (!res.ok) throw new Error("Failed");
                        const data = await res.json();
                        return data.url;
                      });

                      const uploadedUrls = await Promise.all(uploadPromises);

                      setFormData((prev) => {
                        const newImages = [
                          ...(prev.images || []),
                          ...uploadedUrls,
                        ];
                        return {
                          ...prev,
                          images: newImages,
                          image: newImages[0] || "", // First image is main
                        };
                      });
                    } catch (err) {
                      console.error(err);
                      setError("Error al subir algunas imágenes");
                    } finally {
                      setIsLoading(false);
                    }
                  }}
                />
              </label>
            )}
          </div>
        </div>

        {/* General Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
          <div className="col-span-2">
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              Información General
            </h3>
            {error && (
              <div className="mt-2 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
                <X size={16} />
                {error}
              </div>
            )}
          </div>

          <Input
            id="name"
            label="Nombre del Producto"
            placeholder="Ej: Zapatillas Nike Air"
            required
            containerClassName="col-span-2"
            value={formData.name}
            onChange={handleChange}
          />

          <Input
            id="code"
            label="Código (SKU)"
            placeholder="PROD-001"
            required
            value={formData.code}
            onChange={handleChange}
          />
          <Select
            id="category"
            label="Categoría"
            options={[
              { value: "electronics", label: "Electrónica" },
              { value: "clothing", label: "Ropa" },
              { value: "home", label: "Hogar" },
            ]}
            required
            value={formData.category} // Assuming Select supports value/onChange
            onChange={(e) => handleSelectChange("category", e.target.value)}
          />

          <Input
            id="price"
            label="Precio (Bs)"
            type="number"
            placeholder="0.00"
            required
            value={formData.price}
            onChange={handleChange}
          />
          <Input
            id="stock"
            label="Stock Inicial"
            type="number"
            placeholder="0"
            required
            value={formData.stock}
            onChange={handleChange}
          />

          <Input
            id="commissionPercentage"
            label="Comisión para afiliados (%)"
            type="number"
            placeholder="Ej: 20"
            min="0"
            max="100"
            required
            value={formData.commissionPercentage}
            onChange={handleChange}
          />

          <Select
            id="visibility"
            label="Visibilidad"
            options={[
              { value: "public", label: "Público" },
              { value: "private", label: "Privado" },
            ]}
            value={formData.visibility}
            onChange={(e) => handleSelectChange("visibility", e.target.value)}
          />
          <Select
            id="status"
            label="Estado"
            options={[
              { value: "active", label: "Activo" },
              { value: "draft", label: "Borrador" },
            ]}
            value={formData.status}
            onChange={(e) => handleSelectChange("status", e.target.value)}
          />

          <TextArea
            id="description"
            label="Descripción"
            placeholder="Describe tu producto..."
            containerClassName="col-span-2"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-x-4 border-t border-gray-100 pt-6">
          <Link
            href="/dashboard/products"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancelar
          </Link>
          <Button type="submit" isLoading={isLoading} icon={Save}>
            Guardar Producto
          </Button>
        </div>
      </div>
    </form>
  );
}

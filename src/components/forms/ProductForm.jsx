"use client";

import React, { useState } from "react";
import { Input } from "../ui/Input";
import Button from "../ui/Button";
import Select from "../ui/Select";
import TextArea from "../ui/TextArea";
import { Upload, Save, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProductForm({ initialData }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    code: initialData?.code || "",
    category: initialData?.category || "",
    price: initialData?.price || "",
    stock: initialData?.stock || "",
    visibility: initialData?.visibility || "public",
    status: initialData?.status || "active",
    description: initialData?.description || "",
    image: initialData?.image || "",
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
        body: JSON.stringify(formData),
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
          <div className="mt-4 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 bg-gray-50/50">
            <div className="text-center">
              {formData.image ? (
                <div className="relative">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="h-48 w-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, image: "" }))
                    }
                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm hover:bg-gray-100"
                  >
                    <X className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              ) : (
                <>
                  <Upload
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-orange-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-orange-600 focus-within:ring-offset-2 hover:text-orange-500"
                    >
                      <span>Subir archivo</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setFormData((prev) => ({
                                ...prev,
                                image: reader.result,
                              }));
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                    <p className="pl-1">o arrastrar y soltar</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF hasta 10MB
                  </p>
                </>
              )}
            </div>
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

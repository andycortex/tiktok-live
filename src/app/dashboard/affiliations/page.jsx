"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useUser } from "@/context/UserContext";
import Button from "@/components/ui/Button";
import { ShoppingBag, CheckCircle } from "lucide-react";

export default function AffiliationsPage() {
  const { user } = useUser();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    if (user) {
      fetchMarketplace();
    }
  }, [user]);

  const fetchMarketplace = async () => {
    try {
      const res = await fetch(
        `/api/affiliations/marketplace?userId=${user.id}`,
      );
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      console.error("Error fetching marketplace:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAffiliate = async (productId) => {
    setProcessingId(productId);
    try {
      const res = await fetch("/api/affiliations/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          productId,
        }),
      });

      if (res.ok) {
        // Update local state to show as affiliated
        setProducts((prev) =>
          prev.map((p) =>
            p.id === productId
              ? { ...p, isAffiliated: true, affiliationStatus: "ACTIVE" }
              : p,
          ),
        );
      } else {
        alert("Error al afiliarse");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setProcessingId(null);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Mercado de Afiliación
        </h1>
        <p className="text-gray-500 mt-1">
          Encuentra productos para vender y gana comisiones.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col"
          >
            <div className="aspect-square relative bg-gray-100">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <ShoppingBag size={48} />
                </div>
              )}
              {product.isAffiliated && (
                <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <CheckCircle size={12} /> Afiliado
                </div>
              )}
            </div>

            <div className="p-4 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {product.owner?.empresa || product.owner?.nombre}
                  </p>
                  <p className="text-xs font-medium text-green-600 mt-1">
                    Gana: {product.commissionPercentage}%
                  </p>
                </div>
                <span className="font-bold text-orange-600">
                  Bs {product.price}
                </span>
              </div>

              <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-grow">
                {product.description || "Sin descripción"}
              </p>

              <div className="mt-auto">
                {product.isAffiliated ? (
                  <Button
                    fullWidth
                    disabled
                    variant="secondary"
                    className="bg-gray-100 text-gray-500 border-gray-200"
                  >
                    Ya eres afiliado
                  </Button>
                ) : (
                  <Button
                    fullWidth
                    onClick={() => handleAffiliate(product.id)}
                    isLoading={processingId === product.id}
                  >
                    Afiliarse
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}

        {products.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            No hay productos disponibles para afiliarse en este momento.
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

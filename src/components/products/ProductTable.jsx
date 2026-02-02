import React, { useState } from "react";
import { ProductRow } from "./ProductRow";
import { Checkbox } from "../ui/Checkbox";

export const ProductTable = ({ products, isLoading, onDelete }) => {
  const [selectedIds, setSelectedIds] = useState(new Set());

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(new Set(products.map((p) => p.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelectOne = (id) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const allSelected =
    products.length > 0 && selectedIds.size === products.length;

  if (isLoading) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-white rounded-xl shadow-sm ring-1 ring-gray-100">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-white">
            {/* Design shows white header usually or very light gray. Keeping white for clean look */}
            <tr>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider w-4"
              >
                <Checkbox checked={allSelected} onChange={handleSelectAll} />
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider"
              >
                Producto
              </th>
              <th
                scope="col"
                className="hidden sm:table-cell px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider"
              >
                Estado
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider"
              >
                Precio
              </th>
              <th
                scope="col"
                className="hidden lg:table-cell px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider"
              >
                Afiliados
              </th>
              <th
                scope="col"
                className="hidden lg:table-cell px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider"
              >
                Stock
              </th>
              <th
                scope="col"
                className="hidden xl:table-cell px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider"
              >
                Comisión
              </th>
              <th
                scope="col"
                className="hidden xl:table-cell px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider"
              >
                Visibilidad
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider"
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-50">
            {products.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                  No hay productos encontrados.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  isSelected={selectedIds.has(product.id)}
                  onSelect={() => handleSelectOne(product.id)}
                  onDelete={onDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

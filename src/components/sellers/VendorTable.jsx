import React from "react";
import { VendorRow } from "./VendorRow";

export const VendorTable = ({ vendors, isLoading, onDelete }) => {
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
            <tr>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider"
              >
                Vendedor
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
                Ventas
              </th>
              <th
                scope="col"
                className="hidden md:table-cell px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider"
              >
                Monto Total
              </th>
              <th
                scope="col"
                className="hidden lg:table-cell px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider"
              >
                Comisión
              </th>
              <th
                scope="col"
                className="hidden xl:table-cell px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider"
              >
                Contacto
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider"
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-50">
            {vendors.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                  No hay vendedores registrados.
                </td>
              </tr>
            ) : (
              vendors.map((vendor) => (
                <VendorRow
                  key={vendor.id}
                  vendor={vendor}
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

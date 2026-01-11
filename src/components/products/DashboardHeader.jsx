import React from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Search, FolderUp, Plus, Share2 } from "lucide-react";

export const DashboardHeader = () => {
  return (
    <div className="space-y-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Catálogo de Productos
          </h1>
          <p className="text-gray-500 mt-1">Gestiona tu inventario</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Button
            variant="secondary"
            icon={Share2}
            className="justify-center sm:justify-start"
          >
            Compartir
          </Button>
          <Button
            variant="primary"
            icon={Plus}
            className="justify-center sm:justify-start"
          >
            Nuevo Producto
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="w-full lg:max-w-md">
          <Input
            icon={Search}
            placeholder="Buscar productos..."
            className="bg-white"
          />
        </div>
        <div className="w-full lg:w-auto">
          <Button
            variant="secondary"
            className="w-full lg:w-auto bg-white text-gray-700 border-gray-200 justify-center"
          >
            <span className="mr-2 text-yellow-500">
              <FolderUp
                size={18}
                fill="currentColor"
                className="text-yellow-400"
              />
            </span>
            <span className="font-semibold">Carga masiva</span>
            <span className="ml-1 text-gray-400 font-normal">- Excel/CSV</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm">
        <span className="font-semibold text-gray-900">
          20 <span className="text-gray-500 font-normal">productos</span>
        </span>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
          <span className="font-semibold text-gray-900">
            15 <span className="text-gray-500 font-normal">activos</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
          <span className="font-semibold text-gray-900">
            3 <span className="text-gray-500 font-normal">públicos</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
          <span className="font-semibold text-gray-900">
            4 <span className="text-gray-500 font-normal">stock bajo</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
          <span className="font-semibold text-gray-900">
            3 <span className="text-gray-500 font-normal">agotados</span>
          </span>
        </div>
      </div>
    </div>
  );
};

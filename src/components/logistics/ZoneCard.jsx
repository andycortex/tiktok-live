import React from "react";
import Button from "../ui/Button";
import { Badge } from "../ui/Badge";
import {
  Pencil,
  Trash2,
  MapPin,
  Clock,
  Calendar,
  Truck,
  Package,
} from "lucide-react";
import Link from "next/link";

export const ZoneCard = ({ zone, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl ${zone.iconBg || "bg-gray-100"}`}>
              {/* Placeholder for zone icon/image */}
              {zone.icon || <MapPin className="h-6 w-6 text-gray-600" />}
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">{zone.name}</h3>
              <p className="text-sm text-gray-400">{zone.region}</p>
            </div>
          </div>
          <div className="bg-orange-500 text-white font-bold px-3 py-1.5 rounded-lg text-sm">
            {zone.price}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="mt-0.5 shrink-0">
              <Package className="h-4 w-4 text-orange-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">
                INSTRUCCIONES
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {zone.instructions}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="mt-0.5 shrink-0">
              <Clock className="h-4 w-4 text-orange-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">
                HORARIO
              </p>
              <p className="text-sm text-gray-600">{zone.schedule}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="mt-0.5 shrink-0">
              <Truck className="h-4 w-4 text-orange-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">
                TIEMPO DE ENTREGA
              </p>
              <p className="text-sm text-gray-600">{zone.deliveryTime}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="mt-0.5 shrink-0">
              <MapPin className="h-4 w-4 text-orange-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">
                COBERTURA
              </p>
              <p className="text-sm text-gray-600">{zone.coverage}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-50 bg-gray-50/50 flex gap-3">
        <Link href={`/dashboard/logistics/${zone.id}`} className="flex-1">
          <Button
            variant="outline"
            className="w-full justify-center border-gray-200 text-gray-600 hover:text-gray-900 bg-white"
            icon={Pencil}
          >
            Editar
          </Button>
        </Link>
        <Button
          variant="outline"
          className="flex-1 justify-center border-gray-200 text-gray-600 hover:text-red-600 hover:border-red-100 hover:bg-red-50 bg-white"
          icon={Trash2}
          onClick={() => onDelete && onDelete(zone.id)}
        >
          Eliminar
        </Button>
      </div>
    </div>
  );
};

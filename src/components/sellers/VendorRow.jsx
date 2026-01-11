import React from "react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Avatar } from "../ui/Avatar";
import { Pencil, Eye, Ban } from "lucide-react";

export const VendorRow = ({ vendor }) => {
  return (
    <tr className="hover:bg-gray-50 border-b border-gray-100 last:border-0 group">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <Avatar
            initials={vendor.initials}
            className={`${vendor.color} text-white mr-4 h-10 w-10 text-sm font-bold`}
          />
          <div>
            <div className="text-sm font-semibold text-gray-900">
              {vendor.name}
            </div>
            <div className="text-xs text-gray-400">Desde {vendor.joinDate}</div>
          </div>
        </div>
      </td>
      <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap">
        <Badge variant={vendor.status === "active" ? "success" : "neutral"}>
          {vendor.status === "active" ? "Activo" : "Inactivo"}
        </Badge>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
        {vendor.sales}
      </td>
      <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-orange-500">
        {vendor.totalAmount}
      </td>
      <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
        {vendor.commission}
      </td>
      <td className="hidden xl:table-cell px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900 font-medium">{vendor.phone}</div>
        <div className="text-xs text-gray-400">{vendor.email}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-indigo-400 hover:bg-indigo-50"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <Ban className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-orange-400 hover:text-orange-500 hover:bg-orange-50"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
};

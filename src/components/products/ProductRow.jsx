import React from "react";
import { Badge } from "../ui/Badge";
import Button from "../ui/Button";
import { Checkbox } from "../ui/Checkbox";
import { Avatar } from "../ui/Avatar";
import { Pencil, Download, Trash2, Lock, Globe } from "lucide-react";

export const ProductRow = ({ product, isSelected, onSelect }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge variant="success">Activo</Badge>;
      case "low_stock":
        return <Badge variant="warning">Stock Bajo</Badge>;
      case "out_of_stock":
        return <Badge variant="danger">Agotado</Badge>;
      default:
        return <Badge variant="neutral">Desconocido</Badge>;
    }
  };

  const getVisibilityBadge = (visibility) => {
    if (visibility === "public") {
      return (
        <Badge variant="info" className="gap-1" hasDot={false}>
          <Globe className="h-3 w-3" /> Público
        </Badge>
      );
    }
    return (
      <Badge
        variant="neutral"
        className="gap-1 bg-orange-50 text-orange-700"
        hasDot={false}
      >
        {/* Custom styles for private to match image */}
        <Lock className="h-3 w-3" /> Privado
      </Badge>
    );
  };

  return (
    <tr className="hover:bg-gray-50 border-b border-gray-100 last:border-0">
      <td className="px-6 py-4 whitespace-nowrap w-4">
        <Checkbox checked={isSelected} onChange={onSelect} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <Avatar
            src={product.image}
            initials={product.name.substring(0, 2)}
            shape="square"
            className="h-10 w-10 mr-4 rounded-xl"
          />
          {/* Image in design has rounded-xl and maybe a background for the icon */}
          <div>
            <div className="text-sm font-semibold text-gray-900">
              {product.name}
            </div>
            <div className="text-xs text-gray-400">{product.code}</div>
          </div>
        </div>
      </td>
      <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap">
        {getStatusBadge(product.status)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-orange-500">
        Bs {product.price}
      </td>
      <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
        {product.vendorPercent}%
      </td>
      <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
        {product.stock}
      </td>
      <td className="hidden xl:table-cell px-6 py-4 whitespace-nowrap">
        {getVisibilityBadge(product.visibility)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-orange-400 hover:text-orange-500 hover:bg-orange-50"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-blue-400 hover:text-blue-500 hover:bg-blue-50"
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
};

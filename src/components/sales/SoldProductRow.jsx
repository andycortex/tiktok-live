import React from "react";
import { Badge } from "../ui/Badge";
import { Avatar } from "../ui/Avatar";
import { User } from "lucide-react";

export const SoldProductRow = ({ sale }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case "entregado":
        return <Badge variant="success">Entregado</Badge>;
      case "pendiente":
        return <Badge variant="warning">Pendiente</Badge>;
      case "en_camino":
        return <Badge variant="info">En Camino</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  return (
    <tr className="hover:bg-gray-50 border-b border-gray-100 last:border-0">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <Avatar
            src={sale.productImage}
            initials="PR"
            shape="square"
            className="h-10 w-10 mr-4 rounded-lg bg-gray-100 p-1"
          />
          {/* Product icon placeholder style */}
          <div>
            <div className="text-sm font-semibold text-gray-900">
              {sale.productName}
            </div>
            <div className="text-xs text-gray-400">{sale.productCode}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-semibold text-gray-900">
          {sale.buyerName}
        </div>
        <div className="text-xs text-gray-400">{sale.buyerPhone}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-medium">
          <User className="h-3 w-3 mr-1.5" />
          {sale.sellerName}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
        {sale.quantity}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-orange-500">
        {sale.price}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {sale.date}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        {getStatusBadge(sale.status)}
      </td>
    </tr>
  );
};

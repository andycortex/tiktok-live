import React from "react";
import { Badge } from "../ui/Badge";
import Button from "../ui/Button";
import { Check, MessageSquare, Eye, AlertTriangle, User } from "lucide-react";

export const OrderRow = ({ order, onStatusChange }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case "entregado":
        return <Badge variant="success">Entregado</Badge>;
      case "confirmado":
        return <Badge variant="info">Confirmado</Badge>;
      case "en_camino":
        return <Badge variant="info">En Camino</Badge>; // Can distinct color if needed
      case "pendiente":
        return <Badge variant="warning">Pendiente</Badge>;
      case "cancelado":
        return <Badge variant="danger">Cancelado</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const handleWhatsApp = () => {
    // Basic cleaning of phone number if needed
    const phone = order.customerPhone.replace(/\D/g, "");
    const message = `Hola ${order.customerName}, te escribo sobre tu pedido ${order.id}.`;
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <tr className="hover:bg-gray-50 border-b border-gray-100 last:border-0 align-top">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-bold text-gray-900">{order.id}</div>
        <div className="text-xs text-gray-400">{order.date}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-semibold text-gray-900">
          {order.customerName}
        </div>
        <div className="text-xs text-gray-400">{order.customerPhone}</div>
      </td>
      <td className="px-6 py-4">
        <div className="space-y-1">
          {order.products.map((prod, idx) => (
            <div key={idx} className="text-sm text-gray-700">
              {prod.name}{" "}
              <span className="text-gray-400">({prod.quantity})</span>
            </div>
          ))}
          {order.paymentPending && (
            <div className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-700 mt-1">
              <AlertTriangle className="h-3 w-3 mr-1" /> Sin pago
            </div>
          )}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <User className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-sm font-medium text-gray-900">
            {order.sellerName}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {order.location}
        </div>
        <div className="text-xs text-gray-400">Envío: {order.shippingCost}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-orange-500">
        {order.total}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {getStatusBadge(order.status)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <div className="flex items-center justify-end gap-2">
          {order.status === "pendiente" && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-400 hover:text-green-500 hover:bg-green-50"
              onClick={() => onStatusChange(order.rawId, "confirmado")}
              title="Confirmar Pedido"
            >
              <Check className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-blue-500 hover:bg-blue-50"
            onClick={handleWhatsApp}
            title="Contactar por WhatsApp"
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
};

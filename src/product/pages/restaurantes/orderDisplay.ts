import type { RestaurantOrderChannel, RestaurantTable } from "../../../lib/database.types";
import type { OrderWithItems } from "./useRestaurantesData";

export const CHANNEL_LABELS: Record<RestaurantOrderChannel, string> = {
  mesa: "Mesa",
  telefono_domicilio: "Teléfono / domicilio",
  recoger: "Recoger en sucursal",
  rappi: "Rappi",
};

export function orderTitle(order: OrderWithItems, tables: RestaurantTable[]): string {
  if (order.canal === "mesa") {
    return tables.find((t) => t.id === order.table_id)?.nombre ?? "Mesa";
  }
  const base = CHANNEL_LABELS[order.canal];
  return order.cliente_nombre ? `${base} — ${order.cliente_nombre}` : base;
}

export function orderSubtitle(order: OrderWithItems): string | null {
  const parts = [order.telefono, order.direccion, order.referencia ? `Ref: ${order.referencia}` : null].filter(
    (p): p is string => !!p,
  );
  return parts.length ? parts.join(" · ") : null;
}

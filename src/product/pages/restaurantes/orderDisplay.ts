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
    const principal = tables.find((t) => t.id === order.table_id);
    const unidas = tables.filter((t) => t.joined_to === order.table_id);
    const nombres = [principal?.nombre, ...unidas.map((t) => t.nombre)].filter((n): n is string => !!n);
    return nombres.length ? nombres.join(" + ") : "Mesa";
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

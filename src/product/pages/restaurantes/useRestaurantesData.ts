import { useCallback, useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import type {
  ProductoServicio,
  RestaurantCashSession,
  RestaurantMenuItem,
  RestaurantOrder,
  RestaurantOrderItem,
  RestaurantReservation,
  RestaurantTable,
  RestaurantTicket,
} from "../../../lib/database.types";

export interface OrderWithItems extends RestaurantOrder {
  items: RestaurantOrderItem[];
}

export function useRestaurantesData(companyId: string) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductoServicio[]>([]);
  const [menuItems, setMenuItems] = useState<RestaurantMenuItem[]>([]);
  const [tables, setTables] = useState<RestaurantTable[]>([]);
  const [openOrders, setOpenOrders] = useState<OrderWithItems[]>([]);
  const [cashSession, setCashSession] = useState<RestaurantCashSession | null>(null);
  const [tickets, setTickets] = useState<RestaurantTicket[]>([]);
  const [reservations, setReservations] = useState<RestaurantReservation[]>([]);

  const load = useCallback(async () => {
    const [
      { data: productsData },
      { data: menuItemsData },
      { data: tablesData },
      { data: ordersData },
      { data: cashSessionData },
      { data: ticketsData },
      { data: reservationsData },
    ] = await Promise.all([
      supabase.from("sales_products_services").select("*").eq("company_id", companyId).eq("activo", true).order("nombre"),
      supabase.from("ldn_restaurant_menu_items").select("*").eq("company_id", companyId).order("orden"),
      supabase.from("ldn_restaurant_tables").select("*").eq("company_id", companyId).order("nombre"),
      supabase
        .from("ldn_restaurant_orders")
        .select("*, items:ldn_restaurant_order_items(*)")
        .eq("company_id", companyId)
        .eq("estado", "abierta")
        .order("opened_at"),
      supabase
        .from("ldn_restaurant_cash_sessions")
        .select("*")
        .eq("company_id", companyId)
        .eq("status", "abierta")
        .order("opened_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
      supabase.from("ldn_restaurant_tickets").select("*").eq("company_id", companyId).order("created_at", { ascending: false }).limit(20),
      supabase
        .from("ldn_restaurant_reservations")
        .select("*")
        .eq("company_id", companyId)
        .neq("estado", "cancelada")
        .order("fecha_hora"),
    ]);

    setProducts(productsData ?? []);
    setMenuItems(menuItemsData ?? []);
    setTables(tablesData ?? []);
    setOpenOrders((ordersData ?? []) as unknown as OrderWithItems[]);
    setCashSession(cashSessionData ?? null);
    setTickets(ticketsData ?? []);
    setReservations(reservationsData ?? []);
    setLoading(false);
  }, [companyId]);

  useEffect(() => {
    load();
  }, [load]);

  return { loading, products, menuItems, tables, openOrders, cashSession, tickets, reservations, reload: load };
}

import { createClient } from "npm:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Cierra una comanda de Restaurantes: calcula el total desde
// ldn_restaurant_order_items (cantidad × precio del catálogo de Ventas),
// crea el ticket + sus pagos, cierra la orden y libera la mesa. Si la
// empresa tiene Tesorería activa, también crea el ingreso ahí — por eso
// vive en una función (toca dos módulos a la vez, necesita ser atómico) y
// no se hace directo desde el cliente.
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { order_id, cash_session_id, propina, payments } = await req.json();
    if (!order_id || !cash_session_id || !Array.isArray(payments) || payments.length === 0) {
      return new Response(JSON.stringify({ error: "Faltan datos" }), { status: 400, headers: corsHeaders });
    }

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "No autorizado" }), { status: 401, headers: corsHeaders });
    }

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const jwt = authHeader.replace("Bearer ", "");
    const { data: callerData, error: callerError } = await admin.auth.getUser(jwt);
    if (callerError || !callerData.user) {
      return new Response(JSON.stringify({ error: "Sesión inválida" }), { status: 401, headers: corsHeaders });
    }

    const { data: order } = await admin
      .from("ldn_restaurant_orders")
      .select("id, company_id, table_id, estado")
      .eq("id", order_id)
      .single();
    if (!order) {
      return new Response(JSON.stringify({ error: "Comanda no encontrada" }), { status: 404, headers: corsHeaders });
    }
    if (order.estado !== "abierta") {
      return new Response(JSON.stringify({ error: "Esta comanda ya está cerrada" }), { status: 400, headers: corsHeaders });
    }

    const { data: callerProfile } = await admin.schema("nuxorb").from("profiles").select("kind").eq("id", callerData.user.id).single();
    let allowed = callerProfile?.kind === "team";
    if (!allowed) {
      const { data: memberRow } = await admin
        .from("company_users")
        .select("id")
        .eq("company_id", order.company_id)
        .eq("user_id", callerData.user.id)
        .maybeSingle();
      allowed = !!memberRow;
    }
    if (!allowed) {
      return new Response(JSON.stringify({ error: "No tienes permiso sobre esta comanda" }), { status: 403, headers: corsHeaders });
    }

    const { data: items } = await admin
      .from("ldn_restaurant_order_items")
      .select("cantidad, sales_products_services(precio_unitario)")
      .eq("order_id", order_id);
    const subtotal = (items ?? []).reduce((sum, it) => {
      const product = it.sales_products_services as unknown as { precio_unitario: number } | null;
      return sum + it.cantidad * (product?.precio_unitario ?? 0);
    }, 0);
    const tip = Number(propina) || 0;
    const total = subtotal + tip;

    const paidTotal = payments.reduce((sum: number, p: { amount: number }) => sum + Number(p.amount || 0), 0);
    if (Math.abs(paidTotal - total) > 0.01) {
      return new Response(
        JSON.stringify({ error: `La suma de los pagos ($${paidTotal.toFixed(2)}) no coincide con el total ($${total.toFixed(2)})` }),
        { status: 400, headers: corsHeaders },
      );
    }

    // Si Tesorería está activa, el ingreso se crea contra la primera cuenta
    // de la empresa — v1 no pide elegir cuenta en el momento de cobrar.
    let treasuryMovementId: string | null = null;
    const { data: tesoreriaModule } = await admin
      .schema("nuxorb")
      .from("company_modules")
      .select("active")
      .eq("company_id", order.company_id)
      .eq("module", "tesoreria")
      .eq("active", true)
      .maybeSingle();
    if (tesoreriaModule) {
      const { data: account } = await admin
        .from("treasury_accounts")
        .select("id")
        .eq("company_id", order.company_id)
        .order("created_at")
        .limit(1)
        .maybeSingle();
      if (account) {
        const { data: movement } = await admin
          .from("treasury_movements")
          .insert({
            company_id: order.company_id,
            account_id: account.id,
            type: "ingreso",
            concept: "Venta restaurante",
            category: "Ventas",
            amount: total,
            source: "manual",
            created_by: callerData.user.id,
          })
          .select()
          .single();
        treasuryMovementId = movement?.id ?? null;
      }
    }

    const { data: ticket, error: ticketError } = await admin
      .from("ldn_restaurant_tickets")
      .insert({
        company_id: order.company_id,
        order_id,
        cash_session_id,
        subtotal,
        propina: tip,
        total,
        treasury_movement_id: treasuryMovementId,
      })
      .select()
      .single();
    if (ticketError || !ticket) {
      return new Response(JSON.stringify({ error: ticketError?.message ?? "No se pudo crear el ticket" }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    await admin.from("ldn_restaurant_ticket_payments").insert(
      payments.map((p: { method: string; amount: number }) => ({
        ticket_id: ticket.id,
        method: p.method,
        amount: p.amount,
      })),
    );

    await admin.from("ldn_restaurant_orders").update({ estado: "cerrada", closed_at: new Date().toISOString() }).eq("id", order_id);
    if (order.table_id) {
      await admin.from("ldn_restaurant_tables").update({ estado: "libre" }).eq("id", order.table_id);
    }

    return new Response(JSON.stringify({ ok: true, ticket_id: ticket.id, total }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: String(err) }), { status: 500, headers: corsHeaders });
  }
});

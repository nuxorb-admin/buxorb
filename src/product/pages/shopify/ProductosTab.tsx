import { useState } from "react";
import type { ShopifyProduct } from "../../../lib/database.types";
import Badge from "../../../admin/components/Badge";

function rangoPrecio(p: ShopifyProduct): string {
  const precios = p.variants.map((v) => v.price).filter((x): x is number => x != null);
  if (precios.length === 0) return "—";
  const min = Math.min(...precios);
  const max = Math.max(...precios);
  const fmt = (n: number) => n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 2 });
  return min === max ? fmt(min) : `${fmt(min)} – ${fmt(max)}`;
}

export default function ProductosTab({ products }: { products: ShopifyProduct[] }) {
  const [q, setQ] = useState("");
  const term = q.trim().toLowerCase();
  const lista = term
    ? products.filter((p) => p.title.toLowerCase().includes(term) || p.variants.some((v) => (v.sku ?? "").toLowerCase().includes(term)))
    : products;

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por nombre o SKU"
          className="w-full max-w-xs border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        />
        <p className="font-mono text-[0.62rem] text-muted">{lista.length} productos</p>
      </div>
      <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
        {lista.length === 0 && <p className="p-4 font-mono text-xs text-muted">Sin productos para mostrar.</p>}
        {lista.map((p) => (
          <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
            <div className="flex items-center gap-3">
              {p.image_url ? (
                <img src={p.image_url} alt="" className="h-10 w-10 border border-ink/10 object-cover" />
              ) : (
                <div className="h-10 w-10 border border-ink/10 bg-sand-2" />
              )}
              <div>
                <p className="text-sm font-semibold text-ink">{p.title}</p>
                <p className="font-mono text-[0.66rem] text-muted">
                  {[p.vendor, p.product_type].filter(Boolean).join(" · ") || "Sin proveedor/tipo"} · {p.variants.length} variantes
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {p.status && <Badge color={p.status === "ACTIVE" ? "teal" : "muted"}>{p.status.toLowerCase()}</Badge>}
              <span className="font-mono text-sm text-ink">{rangoPrecio(p)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

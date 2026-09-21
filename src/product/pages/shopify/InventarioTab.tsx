import { useState } from "react";
import type { ShopifyProduct } from "../../../lib/database.types";

interface Fila {
  key: string;
  producto: string;
  variante: string;
  sku: string | null;
  existencia: number | null;
}

export default function InventarioTab({ products }: { products: ShopifyProduct[] }) {
  const [q, setQ] = useState("");
  const filas: Fila[] = products.flatMap((p) =>
    p.variants.map((v) => ({
      key: `${p.id}-${v.id}`,
      producto: p.title,
      // Shopify llama "Default Title" a la variante única de un producto sin opciones.
      variante: v.title === "Default Title" ? "—" : v.title,
      sku: v.sku,
      existencia: v.inventory_quantity,
    })),
  );
  const term = q.trim().toLowerCase();
  const lista = (term
    ? filas.filter((f) => f.producto.toLowerCase().includes(term) || (f.sku ?? "").toLowerCase().includes(term))
    : filas
  ).sort((a, b) => (a.existencia ?? Infinity) - (b.existencia ?? Infinity));

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por producto o SKU"
          className="w-full max-w-xs border border-ink/15 bg-sand-2 px-3 py-2 text-sm text-ink focus:border-teal focus:outline-none"
        />
        <p className="font-mono text-[0.62rem] text-muted">Existencia total por variante · menor a mayor</p>
      </div>
      <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
        {lista.length === 0 && <p className="p-4 font-mono text-xs text-muted">Sin inventario para mostrar.</p>}
        {lista.map((f) => (
          <div key={f.key} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-ink">{f.producto}</p>
              <p className="font-mono text-[0.66rem] text-muted">
                {f.variante} · SKU {f.sku || "—"}
              </p>
            </div>
            <span className={`font-mono text-sm ${f.existencia != null && f.existencia <= 0 ? "text-orange" : "text-ink"}`}>
              {f.existencia ?? "—"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

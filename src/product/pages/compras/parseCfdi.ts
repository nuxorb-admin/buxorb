// Parseo de CFDI (factura electrónica mexicana) — solo extrae los datos
// estructurales del XML para llenar la compra automáticamente. No valida el
// sello/firma digital contra el SAT (eso es responsabilidad fiscal del
// contador del cliente).

const CFDI_NS_CANDIDATES = ["http://www.sat.gob.mx/cfd/4", "http://www.sat.gob.mx/cfd/3"];
const TFD_NS = "http://www.sat.gob.mx/TimbreFiscalDigital";

export interface ParsedCfdiConcepto {
  descripcion: string;
  cantidad: number;
  precio_unitario: number;
  importe: number;
}

export type CfdiTipoComprobante = "factura" | "nota_credito";

export interface ParsedCfdi {
  rfcEmisor: string;
  nombreEmisor: string;
  fecha: string;
  subtotal: number;
  total: number;
  moneda: string;
  uuidFiscal: string | null;
  conceptos: ParsedCfdiConcepto[];
  tipoDocumento: CfdiTipoComprobante;
  uuidRelacionado: string | null;
}

function firstElementNS(doc: Document, localName: string): Element | null {
  for (const ns of CFDI_NS_CANDIDATES) {
    const found = doc.getElementsByTagNameNS(ns, localName);
    if (found.length > 0) return found[0];
  }
  return null;
}

function elementsNS(doc: Document, localName: string): Element[] {
  for (const ns of CFDI_NS_CANDIDATES) {
    const found = doc.getElementsByTagNameNS(ns, localName);
    if (found.length > 0) return Array.from(found);
  }
  return [];
}

export function parseCfdiXml(xmlText: string): ParsedCfdi {
  const doc = new DOMParser().parseFromString(xmlText, "application/xml");
  const errorNode = doc.querySelector("parsererror");
  if (errorNode) throw new Error("El archivo no es un XML válido");

  const comprobante = firstElementNS(doc, "Comprobante");
  if (!comprobante) throw new Error("No se encontró el nodo Comprobante — ¿es un CFDI válido?");

  const emisor = firstElementNS(doc, "Emisor");
  const timbre = doc.getElementsByTagNameNS(TFD_NS, "TimbreFiscalDigital")[0];

  const conceptos = elementsNS(doc, "Concepto").map((c) => ({
    descripcion: c.getAttribute("Descripcion") ?? "",
    cantidad: Number(c.getAttribute("Cantidad") ?? "0"),
    precio_unitario: Number(c.getAttribute("ValorUnitario") ?? "0"),
    importe: Number(c.getAttribute("Importe") ?? "0"),
  }));

  // TipoDeComprobante "E" (egreso) es como el SAT marca notas de crédito;
  // "I" (ingreso) es una factura normal.
  const tipoDocumento: CfdiTipoComprobante =
    comprobante.getAttribute("TipoDeComprobante") === "E" ? "nota_credito" : "factura";

  // Una NC referencia la factura que abona/cancela vía CfdiRelacionados
  // (TipoRelacion "01"). Tomamos el primer UUID relacionado como sugerencia.
  const cfdiRelacionado = firstElementNS(doc, "CfdiRelacionado");
  const uuidRelacionado = cfdiRelacionado?.getAttribute("UUID") ?? null;

  return {
    rfcEmisor: emisor?.getAttribute("Rfc") ?? "",
    nombreEmisor: emisor?.getAttribute("Nombre") ?? "",
    fecha: (comprobante.getAttribute("Fecha") ?? new Date().toISOString()).slice(0, 10),
    subtotal: Number(comprobante.getAttribute("SubTotal") ?? "0"),
    total: Number(comprobante.getAttribute("Total") ?? "0"),
    moneda: comprobante.getAttribute("Moneda") ?? "MXN",
    uuidFiscal: timbre?.getAttribute("UUID") ?? null,
    conceptos,
    tipoDocumento,
    uuidRelacionado,
  };
}

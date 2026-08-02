// `new Date("2026-08-02")` se interpreta como medianoche UTC — en una zona
// horaria detrás de UTC (México, UTC-6) eso cae en el día anterior al
// mostrarlo con toLocaleDateString(). Anclar la hora a mediodía/medianoche
// local (agregando "T00:00:00", sin sufijo de zona) evita el corrimiento:
// el navegador la interpreta en hora local, no UTC.
export function formatDate(dateStr: string): string {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("es-MX");
}

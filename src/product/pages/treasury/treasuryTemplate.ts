// Plantilla descargable de movimientos: solo pide al usuario los campos que
// no podemos derivar nosotros (fecha, tipo, descripción, monto, categoría).
// Se genera como .xlsx real (no CSV) para poder incluir el desplegable de
// categoría por fila vía data validation de Excel.
import ExcelJS from "exceljs";

const HEADERS = ["Fecha", "Tipo", "Descripción", "Monto", "Categoría"] as const;
const TEMPLATE_ROWS = 500;

export interface TemplateRow {
  fecha: string;
  tipo: string;
  descripcion: string;
  monto: number;
  categoria: string;
}

export async function downloadTreasuryTemplate(categoryNames: string[]) {
  const categories = categoryNames.length > 0 ? categoryNames : ["otros"];

  const wb = new ExcelJS.Workbook();

  // Hoja auxiliar con el catálogo de categorías, oculta — sirve como fuente
  // de la lista desplegable en vez de una fórmula inline (se queda corta si
  // el catálogo crece, ver 4.4 del doc: va a ampliarse).
  const listSheet = wb.addWorksheet("Listas");
  categories.forEach((name, i) => {
    listSheet.getCell(`A${i + 1}`).value = name;
  });
  listSheet.state = "veryHidden";

  const sheet = wb.addWorksheet("Movimientos");
  sheet.columns = [
    { header: HEADERS[0], key: "fecha", width: 14 },
    { header: HEADERS[1], key: "tipo", width: 12 },
    { header: HEADERS[2], key: "descripcion", width: 34 },
    { header: HEADERS[3], key: "monto", width: 14 },
    { header: HEADERS[4], key: "categoria", width: 26 },
  ];
  sheet.getRow(1).font = { bold: true };
  sheet.getRow(1).eachCell((cell) => {
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFE8E4DA" } };
  });

  for (let r = 2; r <= TEMPLATE_ROWS + 1; r++) {
    sheet.getCell(`A${r}`).numFmt = "yyyy-mm-dd";
    sheet.getCell(`B${r}`).dataValidation = {
      type: "list",
      allowBlank: true,
      formulae: ['"ingreso,egreso"'],
      showErrorMessage: true,
      error: "Elige ingreso o egreso de la lista",
    };
    sheet.getCell(`D${r}`).numFmt = "#,##0.00";
    sheet.getCell(`E${r}`).dataValidation = {
      type: "list",
      allowBlank: true,
      formulae: [`Listas!$A$1:$A$${categories.length}`],
      showErrorMessage: true,
      error: "Elige una categoría del catálogo",
    };
  }

  const buffer = await wb.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "plantilla-movimientos-tesoreria.xlsx";
  a.click();
  URL.revokeObjectURL(url);
}

function cellToDateString(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "string" && value.trim()) {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) return parsed.toISOString().slice(0, 10);
  }
  return new Date().toISOString().slice(0, 10);
}

function cellToText(value: unknown): string {
  if (value == null) return "";
  if (typeof value === "object" && "text" in (value as { text?: string })) return String((value as { text?: string }).text ?? "");
  return String(value).trim();
}

function cellToNumber(value: unknown): number {
  if (typeof value === "number") return value;
  const n = Number(String(value ?? "").replace(/[^0-9.\-]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export async function parseTreasuryTemplate(file: File): Promise<TemplateRow[]> {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.load(await file.arrayBuffer());
  const sheet = wb.getWorksheet("Movimientos") ?? wb.worksheets[0];

  const rows: TemplateRow[] = [];
  sheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;
    const descripcion = cellToText(row.getCell(3).value);
    const monto = cellToNumber(row.getCell(4).value);
    if (!descripcion && !monto) return;

    const tipoRaw = cellToText(row.getCell(2).value).toLowerCase();
    rows.push({
      fecha: cellToDateString(row.getCell(1).value),
      tipo: tipoRaw === "egreso" ? "egreso" : "ingreso",
      descripcion: descripcion || "Importado de plantilla",
      monto: Math.abs(monto),
      categoria: cellToText(row.getCell(5).value) || "otros",
    });
  });

  return rows;
}

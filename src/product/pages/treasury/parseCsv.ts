import ExcelJS from "exceljs";

// Lee la primera hoja de un .xlsx tal cual la exporta el banco y la regresa
// como filas de texto, en el mismo formato que parseCsv — así el modal de
// importación bancaria (CsvImportModal) puede mapear columnas sin importar
// si el archivo es CSV o Excel. Punto de entrada genérico para cuando un
// cliente active la automatización de un banco específico (ver
// bankParsers.ts): mientras no haya un parser a la medida, esto ya deja leer
// el archivo "tal cual" y mapear columnas a mano.
export async function parseXlsxToRows(file: File): Promise<string[][]> {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.load(await file.arrayBuffer());
  const sheet = wb.worksheets[0];
  const rows: string[][] = [];
  sheet.eachRow((row) => {
    const cells: string[] = [];
    row.eachCell({ includeEmpty: true }, (cell) => {
      const v = cell.value;
      cells.push(v instanceof Date ? v.toISOString().slice(0, 10) : String(v ?? ""));
    });
    if (cells.some((c) => c.trim() !== "")) rows.push(cells);
  });
  return rows;
}

// Parser CSV ligero, sin dependencias — soporta comillas y comas dentro de
// campos entrecomillados. Suficiente para plantillas propias y exports de
// banco, que son tabulares simples.
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  const pushField = () => {
    row.push(field);
    field = "";
  };
  const pushRow = () => {
    pushField();
    rows.push(row);
    row = [];
  };

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
      continue;
    }
    if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      pushField();
    } else if (c === "\n") {
      pushRow();
    } else if (c === "\r") {
      // ignorado, \r\n se resuelve en el \n
    } else {
      field += c;
    }
  }
  if (field.length > 0 || row.length > 0) pushRow();

  return rows.filter((r) => r.some((cell) => cell.trim() !== ""));
}

export function downloadCsv(filename: string, rows: (string | number)[][]) {
  const csv = rows
    .map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

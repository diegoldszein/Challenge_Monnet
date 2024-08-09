import * as xlsx from 'xlsx';


export function* readExcel(filePath: string) {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const rows = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

  // Ignora la cabecera y devuelve cada fila como un array
  for (let i = 1; i < rows.length; i++) {
    yield rows[i];
  }
}


import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

export function readCsvData<T>(relativePath: string): T[] {
  const filePath = path.join(__dirname, '..', relativePath);
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  const result = Papa.parse<T>(fileContent, {
    header: true,       // uses first row as column names
    skipEmptyLines: true,
  });

  return result.data;
}
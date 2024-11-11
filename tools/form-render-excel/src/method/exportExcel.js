import { get } from 'lodash-es';
import XLSX from 'xlsx';
import { generateSheetData, generateSheetHeader } from '../utils';

export default (arrayData, onChange, schema) => {
  const itemsProperties = get(schema, 'items.properties', {});
  // 生成表头
  const sheetHeader = generateSheetHeader(itemsProperties);
  // 生成数据
  const sheetData = generateSheetData(itemsProperties, arrayData);
  // 下载
  const ws = XLSX.utils.aoa_to_sheet([sheetHeader, ...sheetData]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');
  XLSX.writeFile(wb, 'export.xlsx');
};

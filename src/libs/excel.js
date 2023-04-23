/* eslint-disable */
import XLSX from 'xlsx';
import XLSXS from 'xlsx-style';
import FileSaver from 'file-saver';

function auto_width(ws, data) {
  /*set worksheet max width per col*/
  const colWidth = data.map((row) =>
    row.map((val) => {
      /*if null/undefined*/
      if (val == null) {
        return { wch: 10 };
      } else if (val.toString().charCodeAt(0) > 255) {
        /*if chinese*/
        return { wch: val.toString().length * 2 };
      } else {
        return { wch: val.toString().length };
      }
    }),
  );
  /*start in the first row*/
  let result = colWidth[0];
  for (let i = 1; i < colWidth.length; i++) {
    for (let j = 0; j < colWidth[i].length; j++) {
      if (result[j]['wch'] < colWidth[i][j]['wch']) {
        result[j]['wch'] = colWidth[i][j]['wch'];
      }
    }
  }
  ws['!cols'] = result;
}

function json_to_array(key, jsonData) {
  return jsonData.map((v) =>
    key.map((j) => {
      return v[j];
    }),
  );
}

// fix data,return string
function fixdata(data) {
  let o = '';
  let l = 0;
  const w = 10240;
  for (; l < data.byteLength / w; ++l)
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
  o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
  return o;
}

// get head from excel file,return array
function get_header_row(sheet) {
  const headers = [];
  const range = XLSX.utils.decode_range(sheet['!ref']);
  let C;
  const R = range.s.r; /* start in the first row */
  for (C = range.s.c; C <= range.e.c; ++C) {
    /* walk every column in the range */
    var cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]; /* find the cell in the first row */
    var hdr = 'UNKNOWN ' + C; // <-- replace with your desired default
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
    headers.push(hdr);
  }
  return headers;
}

// get header row from excel file,return array
function get_sheet_header_row(sheet) {
  const headers = [];
  const range = XLSX.utils.decode_range(sheet['!ref']);
  let C;
  const R = range.s.r; /* start in the first row */
  for (C = range.s.c; C <= range.e.c; ++C) {
    let cell = XLSX.utils.encode_cell({ c: C, r: R }); /* find the cell in the first row */
    headers.push(cell);
  }
  return headers;
}

/**
 * 工具方法
 */
function s2ab(s) {
  let buf = new ArrayBuffer(s.length)
  let view = new Uint8Array(buf)
  for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
  return buf
}

export const export_table_to_excel = (id, filename) => {
  const table = document.getElementById(id);
  const wb = XLSX.utils.table_to_book(table);
  XLSX.writeFile(wb, filename);

  /* the second way */
  // const table = document.getElementById(id);
  // const wb = XLSX.utils.book_new();
  // const ws = XLSX.utils.table_to_sheet(table);
  // XLSX.utils.book_append_sheet(wb, ws, filename);
  // XLSX.writeFile(wb, filename);
};

export const export_json_to_excel = ({ data, key, title, filename, autoWidth }) => {
  const wb = XLSX.utils.book_new();
  data.unshift(title);
  const ws = XLSX.utils.json_to_sheet(data, { header: key, skipHeader: true });
  if (autoWidth) {
    const arr = json_to_array(key, data);
    auto_width(ws, arr);
  }
  XLSX.utils.book_append_sheet(wb, ws, filename.slice(0,31));
  XLSX.writeFile(wb, filename + '.xlsx');
};

export const export_array_to_excel = ({ key, data, title, filename, autoWidth }) => {
  const wb = XLSX.utils.book_new();
  const arr = json_to_array(key, data);
  arr.unshift(title);
  const ws = XLSX.utils.aoa_to_sheet(arr);
  if (autoWidth) {
    auto_width(ws, arr);
  }
  XLSX.utils.book_append_sheet(wb, ws, filename.slice(0,31));
  XLSX.writeFile(wb, filename + '.xlsx');
};

export const export_array_to_excel_style = ({ key, data, title, filename, autoWidth, headerStyle, bodyStyle }) => {
  const wb = XLSX.utils.book_new();
  const arr = json_to_array(key, data);
  arr.unshift(title);
  const ws = XLSX.utils.aoa_to_sheet(arr);
  if (autoWidth) {
    auto_width(ws, arr);
  }
  XLSX.utils.book_append_sheet(wb, ws, filename.slice(0,31));

  // // 设置标题行单元格合并
  // // s即start, e即end, r即row, c即column
  // // 合并从--0行0列开始,到0行3列
  // ws['!merges'] = [
  //   { s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }
  // ]

  /*
    设置单元格其他样式
   */
  for (let i in ws) {
    if (i == '!ref' || i == '!merges' || i == '!cols' || i == 'A1') {

    } else {
      ws[i].s = bodyStyle;
    }
  }

  //excel标题样式
  const header = get_sheet_header_row(ws);
  for (let i in header) {
    ws[header[i]].s = headerStyle;
  }

  // 导出Excel, 注意这里用到的是XLSXS对象
  let wbout = XLSXS.write(wb, {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary'
  })
  FileSaver.saveAs(
    new Blob([s2ab(wbout)], {
      type: 'application/octet-stream'
    }),
    filename + '.xlsx'
  )
};

export const read = (data, type) => {
  /* if type == 'base64' must fix data first */
  // const fixedData = fixdata(data)
  // const workbook = XLSX.read(btoa(fixedData), { type: 'base64' })
  const workbook = XLSX.read(data, { type: type });
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  const header = get_header_row(worksheet);
  const results = XLSX.utils.sheet_to_json(worksheet);
  return { header, results };
};

export default {
  export_table_to_excel,
  export_array_to_excel,
  export_array_to_excel_style,
  export_json_to_excel,
  read,
};

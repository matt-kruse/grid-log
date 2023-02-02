/*
A logging utility to create a grid of items that can span multiple lines
 */

// Internal options
const defaultOptions = {
  jsonIndent: 2,
  cellPadding: 1,
  consoleLog: true,
  ascii: false
};
let options = Object.assign({},defaultOptions);

const asciiHorizontal = '-';
const asciiVertical = '|';
const asciiCorner = '+';

const createBorder = function(maxWidths,start,middle,end) {
  let dash = '─';
  if (options.ascii) {
    start = middle = end = asciiCorner;
    dash = asciiHorizontal;
  }
  return start + maxWidths.reduce((str,w)=>{
    let padded = ''.padEnd(w+(options.cellPadding*2),dash);
    return str + (str?middle:'') + padded ;
  },'') + end;
}

const gridLog = function(...rows) {
  if (!rows || !rows.length) return;

  let cellPadding = ''.padStart(options.cellPadding,' ');
  let output = [];
  let divider = options.ascii ? asciiVertical : '│';

  // Make sure we have an array (rows) of arrays (cols)
  if (!Array.isArray(rows[0])) {
    rows = [rows];
  }

  // Find the max width of each column across all rows
  // And the max number of string value rows for each row
  let maxWidth = []; // per col
  let maxHeight = []; // per row
  rows.forEach((row,rowIndex)=>{
    maxHeight[rowIndex] = maxHeight[rowIndex] ?? 0;
    row.forEach((value,colIndex)=>{
      maxWidth[colIndex] = maxWidth[colIndex] ?? 0;
      if (typeof value == "undefined") {
        value = 'undefined'
      }
      // Split the value into an array
      if (typeof value != "string") {
        value = JSON.stringify(value,null,options.jsonIndent);
      }
      value = value.split(/\r?\n/);

      // Update the row's max height if this value is longer
      if (value.length > maxHeight[rowIndex]) {
        maxHeight[rowIndex] = value.length;
      }
      // Update the col's max width if this value is wider
      value.forEach(line=>{
        if (line.length > maxWidth[colIndex]) {
          maxWidth[colIndex] = line.length;
        }
      });
      // Put the array-ified version of the value back into the rows
      row[colIndex] = value;
    });
  });

  let topBorder = createBorder(maxWidth,'┌','┬','┐');
  let middleBorder = createBorder(maxWidth,'├','┼','┤');
  let bottomBorder = createBorder(maxWidth,'└','┴','┘');

  output.push(topBorder);
  rows.forEach((row,rowIndex)=>{
    if (rowIndex>0) {
      output.push(middleBorder);
    }
    for (let rowLineIndex=0; rowLineIndex<maxHeight[rowIndex]; rowLineIndex++) {
      // Processing one line for a given data row
      let line = divider;
      for (let colIndex=0; colIndex<maxWidth.length; colIndex++) {
        let valueLines = row[colIndex] ?? [];
        let lineValue = valueLines[rowLineIndex] ?? ''
        line += `${cellPadding}${lineValue.padEnd(maxWidth[colIndex],' ')}${cellPadding}${divider}`;
      }
      output.push(line);
    }
  });
  output.push(bottomBorder);

  const strOutput = output.join('\n');
  if (options.consoleLog) {
    console.log(strOutput);
  }

  return strOutput;
}

gridLog.options = function(newOptions) {
  options = Object.assign(options,newOptions);
  return gridLog;
}

gridLog.resetOptions = function() {
  Object.assign(options,defaultOptions);
  return gridLog;
}

module.exports = gridLog;

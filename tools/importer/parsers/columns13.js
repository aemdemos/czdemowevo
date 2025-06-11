/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns block (may be nested)
  let columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) {
    columnsBlock = element;
  }
  // Find the first row with column content
  let colsRow = null;
  for (const child of columnsBlock.children) {
    if (child.children.length > 1) {
      colsRow = child;
      break;
    }
  }
  if (!colsRow) colsRow = columnsBlock;
  // Gather all columns in this row
  const columns = Array.from(colsRow.children);
  // Combine the actual columns into a single cell (single array)
  // This ensures the table has one header column and one cell column, as per example
  const combinedCell = columns.length > 0 ? columns : [columnsBlock];
  const cells = [
    ['Columns (columns13)'],
    [combinedCell]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
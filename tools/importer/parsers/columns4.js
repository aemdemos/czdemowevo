/* global WebImporter */
export default function parse(element, { document }) {
  // Find the direct columns container
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // The columns are the direct children of .columns.block
  const cols = Array.from(columnsBlock.children);
  // Defensive: only proceed if there are at least 2 columns
  if (cols.length < 2) return;

  // Table header - always use the block name and variant as in the instructions
  const headerRow = ['Columns (columns4)'];

  // Each .columns.block > div is a column
  // For each column, include its full content as a cell
  // Array.from(col.childNodes) will include all text, elements, line breaks, etc.
  const contentRow = cols.map(col => Array.from(col.childNodes));

  const cells = [
    headerRow,
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
  return table;
}

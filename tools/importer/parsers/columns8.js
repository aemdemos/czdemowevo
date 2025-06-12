/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .columns.block element that contains columns
  const blockDiv = element.querySelector('.columns.block');
  if (!blockDiv) return;

  // Get all direct children of blockDiv (these represent columns)
  const colDivs = Array.from(blockDiv.children);
  if (colDivs.length === 0) return;

  // Prepare the header row (must be a single cell)
  const headerRow = ['Columns (columns8)'];

  // Prepare the content row: one cell for each column
  const contentRow = colDivs.map(col => col);

  // Compose the table
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

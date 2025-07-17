/* global WebImporter */
export default function parse(element, { document }) {
  // Find all direct child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Only continue if there are columns to process
  if (columns.length === 0) return;

  // The table must have a header row that is a single cell with the correct text
  const headerRow = ['Columns (columns6)'];

  // Prepare the cells for the columns row
  const columnCells = columns.map(col => col);

  // Compose cells according to table structure
  // First row: header (single column)
  // Second row: each column in its own cell
  const cells = [headerRow, columnCells];

  // Create table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}

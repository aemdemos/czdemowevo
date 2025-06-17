/* global WebImporter */
export default function parse(element, { document }) {
  // Gather each immediate child div (column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, use its first child div if present, else itself (defensive)
  const cells = columns.map(col =>
    col.childElementCount === 1 && col.firstElementChild.tagName === 'DIV' ? col.firstElementChild : col
  );

  // Header row: exactly one cell, per requirements
  const headerRow = ['Columns (columns13)'];
  // Content row: one row, n columns
  const contentRow = cells;
  // Compose: header row (1 cell), then a single row with n columns
  const tableData = [headerRow, contentRow];
  
  // Create and replace
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}

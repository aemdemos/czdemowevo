/* global WebImporter */
export default function parse(element, { document }) {
  // Get immediate child columns (should be two button blocks)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (columns.length === 0) return;

  // Header row: must be exactly one column, per block spec
  const headerRow = ['Columns (columns12)'];

  // Content row: as many columns as button containers found
  const contentRow = columns;

  const cells = [
    headerRow,
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns block (may be element itself or a descendant)
  let columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) {
    columnsBlock = element;
  }
  // Get immediate column divs
  const columnDivs = Array.from(columnsBlock.querySelectorAll(':scope > div'));
  // Defensive: only build the table if we have at least 2 columns (per visual)
  if (columnDivs.length < 2) {
    return;
  }
  // Table header must match example
  const headerRow = ['Columns (columns3)'];
  const contentRow = columnDivs.map(col => col);
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(table);
}

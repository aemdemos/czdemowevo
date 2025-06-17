/* global WebImporter */
export default function parse(element, { document }) {
  // Find the steps block
  const stepsBlock = element.querySelector('.steps.block');
  if (!stepsBlock) return;

  // Get all step columns
  const stepColumns = Array.from(stepsBlock.children);
  const contentCells = stepColumns.map((col) => {
    const inner = col.firstElementChild;
    if (!inner) return '';
    return Array.from(inner.children);
  });

  // Header row: exactly one column, as per the example
  const headerRow = ['Columns (columns13)'];
  // Content row: each step is a column
  const tableData = [headerRow, contentCells];
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified in the example
  const headerRow = ['Columns (columns10)'];

  // Find the columns block (handle optional wrapper)
  let columnsBlock = element;
  if (!columnsBlock.classList.contains('columns')) {
    const maybeBlock = columnsBlock.querySelector('.columns.block');
    if (maybeBlock) columnsBlock = maybeBlock;
  }

  // Get all direct column divs
  const columnDivs = Array.from(columnsBlock.querySelectorAll(':scope > div'));

  // Defensive: if we don't have at least 2, fallback to all content in one cell
  if (columnDivs.length < 2) {
    const table = WebImporter.DOMUtils.createTable([
      headerRow,
      [element]
    ], document);
    element.replaceWith(table);
    return;
  }

  // The correct structure: first table data row should have 2 cells, one per column
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    [columnDivs[0], columnDivs[1]]
  ], document);
  element.replaceWith(table);
}

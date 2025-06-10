/* global WebImporter */
export default function parse(element, { document }) {
  // Get the two top-level button containers (Buy Online, Product Locator)
  const containers = element.querySelectorAll(':scope > div');
  // Defensive: If not exactly 2, fill with empty divs
  let firstCol = containers[0] || document.createElement('div');
  let secondCol = containers[1] || document.createElement('div');

  // Table structure: header row (one cell), second row with two columns
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns12)'], // header row: one column
    [firstCol, secondCol],   // content row: two columns side-by-side
  ], document);

  element.replaceWith(table);
}

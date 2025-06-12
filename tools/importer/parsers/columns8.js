/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .columns.block node (should be the first child)
  let columnsBlock = element.querySelector(':scope > .columns.block');
  if (!columnsBlock) {
    // If not found, fallback to first child
    columnsBlock = element.firstElementChild;
  }
  // Get the direct column containers (should be two children)
  const columnDivs = columnsBlock.querySelectorAll(':scope > div');
  // Defensive: Only process if we have at least 2 columns
  if (columnDivs.length < 2) {
    return;
  }
  // Prepare header row
  const headerRow = ['Columns (columns8)'];
  // Prepare columns row: reference the actual column wrappers directly
  const columns = [columnDivs[0], columnDivs[1]];
  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columns,
  ], document);
  // Replace the original element with the new block table
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns block inside the element
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Find the container that holds the columns (should be one direct child)
  const columnsContentContainer = columnsBlock.querySelector(':scope > div');
  if (!columnsContentContainer) return;

  // Get each column (should be direct children)
  const colDivs = columnsContentContainer.querySelectorAll(':scope > div');
  // Edge case: if not exactly 2 columns, fallback to all child divs
  const columns = colDivs.length === 2 ? [colDivs[0], colDivs[1]] : Array.from(columnsContentContainer.children);

  // Table header matches the example exactly
  const headerRow = ['Columns (columns8)'];

  // Content row: reference the actual column content containers
  const cellsRow = columns;

  // Construct table
  const cells = [headerRow, cellsRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}

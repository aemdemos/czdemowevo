/* global WebImporter */
export default function parse(element, { document }) {
  // Set the correct header per requirements
  const headerRow = ['Columns (columns9)'];

  // Find the primary columns block (or fallback to top-level if not found)
  let columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) columnsBlock = element;

  // Get the immediate children that contain the columns
  // The structure is: columns-wrapper > columns.block > div > div x2 (the columns)
  let candidates = columnsBlock.querySelectorAll(':scope > div');
  // Sometimes structure adds an extra div wrapper: check if only one, then descend
  if (candidates.length === 1) {
    candidates = candidates[0].querySelectorAll(':scope > div');
  }

  // If still wrong (unlikely), try one more level
  if (candidates.length === 1 && candidates[0].querySelectorAll(':scope > div').length > 0) {
    candidates = candidates[0].querySelectorAll(':scope > div');
  }

  // Compose the columns row by referencing the original elements
  const columnsRow = Array.from(candidates);
  // Fallback: if this didn't find two columns, treat all children as columns
  if (columnsRow.length < 2) {
    const children = Array.from(columnsBlock.children);
    if (children.length > columnsRow.length) {
      columnsRow.length = 0;
      columnsRow.push(...children);
    }
  }

  const tableRows = [headerRow, columnsRow];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns block within the wrapper
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get all immediate child divs of the columns block (columns)
  const cols = Array.from(columnsBlock.querySelectorAll(':scope > div'));
  if (cols.length < 2) return;

  // Reference the first and second column containers
  const firstCol = cols[0];
  const secondCol = cols[1];

  // For the second column, use the picture if present, otherwise the img
  let imageEl = secondCol.querySelector('picture');
  if (!imageEl) {
    imageEl = secondCol.querySelector('img');
  }
  // If neither found, leave the cell empty

  // Table structure per spec: header should be exactly
  const headerRow = ['Columns (columns8)'];
  const contentRow = [firstCol, imageEl].map((cell) => cell || '');

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}

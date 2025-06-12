/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns block inside (it is always present in this HTML)
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get all the direct children of the columns block: for 2-cols, these are two columns
  const columns = Array.from(columnsBlock.children);
  if (columns.length < 2) return;

  // Reference the existing entire first and second column containers
  const firstCol = columns[0];
  const secondCol = columns[1];

  // Create the block table as specified
  const headerRow = ['Columns (columns4)'];
  const row = [firstCol, secondCol];
  const cells = [headerRow, row];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

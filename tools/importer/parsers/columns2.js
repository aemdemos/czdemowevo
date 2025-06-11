/* global WebImporter */
export default function parse(element, { document }) {
  // The block name as per instructions and example
  const headerRow = ['Columns (columns2)'];

  // Find the columns block
  let columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) {
    // fallback: sometimes .columns.block isn't present, just use the element
    columnsBlock = element;
  }
  // Get the immediate children, which are the columns
  const columns = Array.from(columnsBlock.querySelectorAll(':scope > div'));

  // If there are not exactly 2 columns, default to a single cell with all content
  if (columns.length < 2) {
    const table = WebImporter.DOMUtils.createTable([
      headerRow,
      [columnsBlock]
    ], document);
    element.replaceWith(table);
    return;
  }

  // Use the entire first and second column contents as cells (reference, not clone)
  const firstCol = columns[0];
  const secondCol = columns[1];

  const tableRows = [
    headerRow,
    [firstCol, secondCol]
  ];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}

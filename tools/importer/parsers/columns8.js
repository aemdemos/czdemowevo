/* global WebImporter */
export default function parse(element, { document }) {
  // Get the columns-wrapper and columns block
  const columnsWrapper = element.querySelector('.columns-wrapper');
  if (!columnsWrapper) return;

  const columnsBlock = columnsWrapper.querySelector('.columns.block');
  if (!columnsBlock) return;

  // The columns are the children of the first direct child of columnsBlock
  const columnsRow = columnsBlock.firstElementChild;
  if (!columnsRow) return;
  const cols = Array.from(columnsRow.children);

  // Prepare the single header cell row (only one cell, NOT one per column)
  const headerRow = ['Columns (columns8)'];

  // Prepare the content row: one cell per column
  const contentRow = cols.map((col) => {
    const children = Array.from(col.children);
    if (children.length === 0) {
      return col;
    } else if (children.length === 1) {
      return children[0];
    } else {
      return children;
    }
  });

  // Compose the cells array
  const cells = [headerRow, contentRow];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

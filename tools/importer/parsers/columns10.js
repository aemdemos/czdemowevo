/* global WebImporter */
export default function parse(element, { document }) {
  // Find the actual columns block inside the wrapper
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // The columns block contains a row div, whose children are the column divs
  const rowDiv = columnsBlock.firstElementChild;
  if (!rowDiv) return;

  // Find the first (text) and second (image) columns
  let textCol = null;
  let imageCol = null;
  const children = Array.from(rowDiv.children);
  if (children.length === 2) {
    // Assume: first is text, second is image
    textCol = children[0];
    imageCol = children[1];
  } else {
    // Fallback: find by class
    textCol = children.find(col => !col.classList.contains('columns-img-col'));
    imageCol = children.find(col => col.classList.contains('columns-img-col'));
  }
  if (!textCol || !imageCol) return;

  // Build the table: header row, then one row with two cells
  const cells = [
    ['Columns (columns10)'],
    [textCol, imageCol]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

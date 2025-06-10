/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main columns block
  let columnsBlock = element;
  // Support both .columns-wrapper and direct .columns use
  if (element.classList.contains('columns-wrapper')) {
    const maybe = element.querySelector(':scope > .columns');
    if (maybe) columnsBlock = maybe;
  }

  // Get top-level column containers (should be two)
  const mainCols = columnsBlock.querySelectorAll(':scope > div');
  if (mainCols.length < 2) return;

  // Get the left column: descend to deepest single-child div
  let leftCol = mainCols[0];
  while (leftCol.children.length === 1 && leftCol.firstElementChild && leftCol.firstElementChild.tagName === 'DIV') {
    leftCol = leftCol.firstElementChild;
  }

  // Get the right column: typically direct picture
  let rightCol = mainCols[1];
  while (rightCol.children.length === 1 && rightCol.firstElementChild && rightCol.firstElementChild.tagName === 'DIV') {
    rightCol = rightCol.firstElementChild;
  }

  // The block header per specification
  const headerRow = ['Columns (columns9)'];
  // Second row: two columns, leftCol and rightCol
  const contentRow = [leftCol, rightCol];

  // Create and replace with block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  columnsBlock.replaceWith(table);
}

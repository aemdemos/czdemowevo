/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .columns.block inside the wrapper
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get immediate children of the columns block (should be the two columns)
  const colWrappers = Array.from(columnsBlock.children);
  if (colWrappers.length < 2) return;
  
  // For the left column, drill down to the deepest single-child div
  let leftCol = colWrappers[0];
  let prevLeftCol = null;
  while (
    leftCol &&
    leftCol.children.length === 1 &&
    leftCol.firstElementChild &&
    leftCol.tagName === 'DIV'
  ) {
    prevLeftCol = leftCol;
    leftCol = leftCol.firstElementChild;
  }
  // Defensive: if we drill down too far, back up one level
  if (leftCol && leftCol.tagName !== 'DIV' && prevLeftCol) {
    leftCol = prevLeftCol;
  }

  // For the right column (image), typically .columns-img-col, but fallback to grilling down
  let rightCol = colWrappers[1];
  let prevRightCol = null;
  while (
    rightCol &&
    rightCol.children.length === 1 &&
    rightCol.firstElementChild &&
    rightCol.tagName === 'DIV'
  ) {
    prevRightCol = rightCol;
    rightCol = rightCol.firstElementChild;
  }
  if (rightCol && rightCol.tagName !== 'DIV' && prevRightCol) {
    rightCol = prevRightCol;
  }

  // Build the table for the block
  const headerRow = ['Columns (columns1)'];
  const contentRow = [leftCol, rightCol];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  
  element.replaceWith(table);
}

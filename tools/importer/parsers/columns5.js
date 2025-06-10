/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns block (may be wrapped in a .columns-wrapper)
  let columnsBlock = element;
  if (!columnsBlock.classList.contains('columns')) {
    columnsBlock = columnsBlock.querySelector('.columns');
    if (!columnsBlock) return;
  }

  // Get the direct children - these are usually the columns (left: content, right: image)
  const directChildren = Array.from(columnsBlock.children);
  let leftCol = null, rightCol = null;
  if (directChildren.length >= 2) {
    leftCol = directChildren[0];
    rightCol = directChildren[1];
  } else if (directChildren.length === 1) {
    leftCol = directChildren[0];
  } else {
    return;
  }

  // Drill down leftCol to actual content block (may be nested divs)
  let leftContent = leftCol;
  while (
    leftContent &&
    leftContent.children.length === 1 &&
    leftContent.firstElementChild.tagName === 'DIV'
  ) {
    leftContent = leftContent.firstElementChild;
  }

  // For rightCol, look for <picture> (or fallback to the column itself)
  let rightContent = null;
  if (rightCol) {
    let picture = rightCol.querySelector('picture');
    rightContent = picture ? picture : rightCol;
  }

  // The header must be a single cell, and the columns row must contain one cell for each column present
  const headerRow = ['Columns (columns5)'];
  const columnsRow = [];
  if (leftContent) columnsRow.push(leftContent);
  if (rightContent) columnsRow.push(rightContent);
  // Only include as many cells as present in the HTML, do not add empty cells
  if (columnsRow.length === 0) return;

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  element.replaceWith(table);
}

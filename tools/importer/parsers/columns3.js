/* global WebImporter */
export default function parse(element, { document }) {
  // Find the direct columns block inside the wrapper
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Find the two top-level columns (should be two direct children)
  const columnDivs = Array.from(columnsBlock.children);
  if (columnDivs.length < 2) return;

  // Left column: drill down to main content
  let leftCol = columnDivs[0];
  // Drill through single-child div wrappers to get to the content
  while (leftCol && leftCol.children.length === 1 && leftCol.firstElementChild.tagName === 'DIV') {
    leftCol = leftCol.firstElementChild;
  }

  // Right column: find the picture or img in the right column
  let rightCol = columnDivs[1];
  let imgEl = rightCol.querySelector('picture, img');
  // If not found, try the whole rightCol (for safety, e.g. if markup changes)
  if (!imgEl && rightCol.firstElementChild) {
    imgEl = rightCol.firstElementChild;
  }

  // Table header exactly as specified
  const headerRow = ['Columns (columns3)'];
  // Table content row: left is all content block, right is image (if present)
  const contentRow = [leftCol, imgEl];

  const rows = [
    headerRow,
    contentRow,
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

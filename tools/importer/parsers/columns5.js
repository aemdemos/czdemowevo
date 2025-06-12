/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns block inside the columns-wrapper
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Find immediate child columns
  const columnDivs = Array.from(columnsBlock.querySelectorAll(':scope > div'));

  // Defensive: If not exactly two columns, abort (per structure)
  if (columnDivs.length !== 2) return;

  // Left column: content (possibly with extra wrappers)
  let leftCol = columnDivs[0];
  // Drill down to the deepest div that contains the real content
  while (
    leftCol &&
    leftCol.children.length === 1 &&
    leftCol.firstElementChild &&
    leftCol.firstElementChild.tagName === 'DIV'
  ) {
    leftCol = leftCol.firstElementChild;
  }

  // Right column: may have class 'columns-img-col', just use whole node
  let rightCol = columnDivs[1];

  // Compose the header row and content row
  const cells = [
    ['Columns (columns5)'],
    [leftCol, rightCol]
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

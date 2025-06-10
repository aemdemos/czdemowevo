/* global WebImporter */
export default function parse(element, { document }) {
  // Find the actual columns block (may be the current element or its first child)
  let block = element;
  if (!block.classList.contains('columns')) {
    const maybe = element.querySelector(':scope > .columns');
    if (maybe) block = maybe;
  }

  // Get the two columns as immediate children
  const colDivs = Array.from(block.querySelectorAll(':scope > div'));
  if (colDivs.length !== 2) return;

  // First column is the content column
  let contentCell = colDivs[0];
  // In some cases the content is wrapped inside more <div>s
  // E.g. <div><div><div>CONTENT</div></div></div>
  while (
    contentCell.children.length === 1 &&
    contentCell.firstElementChild &&
    ['DIV', 'SECTION'].includes(contentCell.firstElementChild.tagName)
  ) {
    contentCell = contentCell.firstElementChild;
  }

  // Second column is the image/media column
  let imageCell = colDivs[1];
  // Sometimes with a wrapper .columns-img-col
  const imageColInner = imageCell.querySelector(':scope > .columns-img-col');
  if (imageColInner) {
    imageCell = imageColInner;
  }

  // The required table header
  const headerRow = ['Columns (columns9)'];
  // The columns row
  const cells = [
    headerRow,
    [contentCell, imageCell]
  ];
  // Create table and replace original block
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

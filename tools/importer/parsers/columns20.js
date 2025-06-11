/* global WebImporter */
export default function parse(element, { document }) {
  // Goal: Only create a single column (cell) in the second row, containing the image
  // Find the <picture> or <img> inside the block
  let imgEl = element.querySelector('picture');
  if (!imgEl) {
    imgEl = element.querySelector('img');
  }
  // If neither found, fallback to the element itself
  const cellContent = imgEl || element;

  const cells = [
    ['Columns (columns20)'],
    [cellContent]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the button (slide content)
  const buttonLinks = Array.from(element.querySelectorAll('a'));
  let cellContent = '';
  if (buttonLinks.length === 1) {
    cellContent = buttonLinks[0];
  } else if (buttonLinks.length > 1) {
    cellContent = buttonLinks;
  }

  // Build table: 1 header column, 1 content column per row
  const cells = [
    ['Carousel (carousel21)'],
    [cellContent],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

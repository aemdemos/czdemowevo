/* global WebImporter */
export default function parse(element, { document }) {
  // Find main hero block
  const heroBlock = element.querySelector('.hero.block') || element;
  const left = heroBlock.querySelector('.left');
  const right = heroBlock.querySelector('.right');

  // Get content elements from left
  let heading = left && left.querySelector('h1');
  let subheading = left && left.querySelector('h2');
  let cta = left && left.querySelector('a');

  // Get image from right
  let imgEl = null;
  if (right) {
    imgEl = right.querySelector('picture') || right.querySelector('img');
  }

  // Get footer content
  let footer = element.querySelector('.hero-footer');
  let footerNodes = [];
  if (footer) {
    footerNodes = Array.from(footer.children);
  }

  // Build the cell content in the correct order
  const cellContent = [];
  if (imgEl) cellContent.push(imgEl);
  if (heading) cellContent.push(heading);
  if (subheading) cellContent.push(subheading);
  if (cta) cellContent.push(cta);
  if (footerNodes.length) cellContent.push(...footerNodes);

  // Fallback: if nothing found, use an empty string
  const cells = [
    ['Hero (hero17)'],
    [cellContent.length > 0 ? cellContent : '']
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

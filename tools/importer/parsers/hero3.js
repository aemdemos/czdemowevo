/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main callout block
  const callout = element.querySelector('.callout.block');
  if (!callout) return;

  // Extract all <picture> elements in order
  const pictures = callout.querySelectorAll('picture');
  // Extract the main heading (h1-h6)
  const heading = callout.querySelector('h1, h2, h3, h4, h5, h6');

  // Build table rows to match example: 1 col, 3 rows: header, image, content
  const rows = [];
  rows.push(['Hero']); // Header row: EXACT match to example

  // Second row: Background image (optional)
  rows.push([pictures[0] || '']);

  // Third row: Heading + Icon/image (optional)
  // The example shows the heading and a decorative/award image on the same row, both in one cell
  let contentCell = [];
  if (heading) {
    contentCell.push(heading);
  }
  if (pictures.length > 1) {
    contentCell.push(pictures[1]);
  }
  // If neither heading nor second pic, cell remains empty
  rows.push([contentCell.length ? contentCell : '']);

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

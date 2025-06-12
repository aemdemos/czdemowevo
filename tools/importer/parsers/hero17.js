/* global WebImporter */
export default function parse(element, { document }) {
  // Find the hero block container
  const calloutBlock = element.querySelector('.callout.block');
  if (!calloutBlock) return;

  // Get all immediate children in order
  const children = Array.from(calloutBlock.children);

  // Collect all <picture> elements in order
  const pictures = children.filter(el => el.tagName === 'PICTURE');
  // Collect first heading (h1-h6)
  const heading = children.find(el => /^H[1-6]$/.test(el.tagName));

  // Build the cells as per the markdown example
  // 1. Header row: 'Hero'
  // 2. Second row: first <picture> (background)
  // 3. Third row: Heading (if present), then second <picture> (decorative, if present)

  const cells = [];
  // Header row
  cells.push(['Hero']);

  // Second row: first picture (or blank)
  if (pictures[0]) {
    cells.push([pictures[0]]);
  } else {
    cells.push(['']);
  }

  // Third row: heading and decorative foreground picture, both if present
  const content = [];
  if (heading) content.push(heading);
  if (pictures[1]) content.push(pictures[1]);
  // If both present, include both; if only one present, include just that; if neither, add blank.
  if (content.length > 0) {
    // If both, pass as array for a block cell
    cells.push([content.length === 1 ? content[0] : content]);
  } else {
    cells.push(['']);
  }

  // Create the table and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

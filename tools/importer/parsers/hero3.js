/* global WebImporter */
export default function parse(element, { document }) {
  // Find main callout block
  let block = element.querySelector('.callout.block');
  if (!block) block = element;

  // Get direct children of block
  const children = Array.from(block.children);

  // Find first <picture> (background image)
  const bgImage = children.find(el => el.tagName.toLowerCase() === 'picture');

  // Find first heading (h1/h2/h3...), used as title
  const heading = children.find(el => /^h[1-6]$/.test(el.tagName.toLowerCase()));

  // Build the table structure (1 column, 3 rows)
  // Row 1: Header (exactly as in example: 'Hero')
  // Row 2: Background image (if present)
  // Row 3: Heading (if present)
  const cells = [
    ['Hero'],
    [bgImage || ''],
    [heading || ''],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the element with the block table
  element.replaceWith(table);
}

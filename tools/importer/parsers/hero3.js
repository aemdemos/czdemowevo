/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .callout block which contains the hero content
  const calloutBlock = element.querySelector('.callout.block');
  if (!calloutBlock) {
    // Fallback: if .callout.block is missing, do nothing
    return;
  }

  // Get all direct children of the callout block
  const children = Array.from(calloutBlock.children);

  // Find all <picture> elements (usually there are two)
  const pictures = children.filter(el => el.tagName && el.tagName.toLowerCase() === 'picture');
  // Find the first heading among the children
  const heading = children.find(el => /^H[1-6]$/.test(el.tagName));

  // Build rows according to the markdown example:
  // Row 1: Hero (header)
  // Row 2: Background image (FIRST <picture> only, if exists)
  // Row 3: Heading (FIRST heading only, if exists)
  const rows = [
    ['Hero'],
    [pictures[0] || ''],
    [heading || ''],
  ];
  
  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the table
  element.replaceWith(table);
}

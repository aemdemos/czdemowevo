/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .callout.block (the main block for hero content)
  const block = element.querySelector('.callout.block');
  if (!block) return;

  // Collect all direct children of the block in order
  const children = Array.from(block.children);

  // Find all <picture> elements (for images)
  const pictures = children.filter(el => el.tagName && el.tagName.toLowerCase() === 'picture');
  // Find all heading elements (for headings)
  const headings = children.filter(el => /^H[1-6]$/.test(el.tagName));

  // Compose the rows for the hero table
  // Row 1: Header row
  const headerRow = ['Hero'];

  // Row 2: Background image (first <picture>) or empty
  const backgroundImgRow = [pictures[0] || ''];

  // Row 3: All headings, and the second <picture> (if present)
  const contentArr = [];
  if (headings.length) contentArr.push(...headings);
  if (pictures.length > 1) contentArr.push(pictures[1]);
  const contentRow = [contentArr.length > 0 ? contentArr : ''];

  // Build the hero block table
  const table = WebImporter.DOMUtils.createTable([headerRow, backgroundImgRow, contentRow], document);
  
  // Replace the original element with the new block table
  element.replaceWith(table);
}

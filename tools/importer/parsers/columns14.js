/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns block
  const block = element.querySelector('.footer.block');
  if (!block) return;

  // Get all direct children as column content
  const children = Array.from(block.children).filter(child => {
    // Only include non-empty elements
    if (child.children.length) return true;
    // Also include if has meaningful text
    return child.textContent && child.textContent.trim().length > 0;
  });

  // Only add a second column if it exists
  const contentRow = children.length > 1 ? [children[0], children[1]] : [children[0]];
  
  // Header row: exactly one column
  const headerRow = ['Columns (columns14)'];
  const cells = [headerRow, contentRow];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

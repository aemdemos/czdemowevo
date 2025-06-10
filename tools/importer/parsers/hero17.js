/* global WebImporter */
export default function parse(element, { document }) {
  // Find the innermost block containing the hero content
  const block = element.querySelector('.callout.block');
  if (!block) return;

  // Collect all direct children of the hero block in order
  // This will typically include the main image, heading, and possibly a decorative image
  const children = Array.from(block.children).filter(child => {
    // Only include elements that are not empty
    if (child.tagName === 'PICTURE') return true;
    if (child.tagName.match(/^H[1-6]$/) && child.textContent.trim()) return true;
    // Could have CTA, etc. For now, include all children
    return true;
  });
  
  // Defensive: If no children, do not replace
  if (!children.length) return;

  // Compose the table rows
  const cells = [
    ['Hero (hero17)'],
    [children]
  ];

  // Create and replace with the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

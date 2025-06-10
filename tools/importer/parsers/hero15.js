/* global WebImporter */
export default function parse(element, { document }) {
  // Find the core callout block within the given element
  const callout = element.querySelector('.callout.block');
  if (!callout) return;

  // Get all direct children of the callout for maximal resilience to structure variations
  const children = Array.from(callout.children);
  const cellContent = [];

  // The Hero (hero15) block expects:
  // - Background Image (optional)
  // - Title (mandatory) - styled as a Heading.
  // - Subheading (optional)
  // - Call-to-Action (optional)
  // Per the example, all of these are stacked in a single cell
  // We preserve order and only push images (picture) and headings, as in the example

  // Get all <picture> elements and any heading element
  children.forEach(child => {
    if (child.tagName === 'PICTURE') {
      cellContent.push(child);
    }
    if (/^H[1-6]$/.test(child.tagName)) {
      cellContent.push(child);
    }
    // If future: handle subheading and CTA if present
  });

  if (cellContent.length === 0) {
    // Fallback: If nothing found, put all content in
    cellContent.push(...children);
  }

  const cells = [
    ['Hero (hero15)'],
    [cellContent]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

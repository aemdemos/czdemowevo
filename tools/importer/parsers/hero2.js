/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .hero.block (main block)
  const heroBlock = element.querySelector('.hero.block') || element;

  // The left side (headings, subheading, CTA)
  const left = heroBlock.querySelector('.left');
  // The right side (image)
  const right = heroBlock.querySelector('.right');
  // The footer (optional subheading)
  const footer = element.querySelector('.hero-footer');

  // Image cell: use <picture> from right, else blank
  let imageCell = '';
  if (right) {
    const picture = right.querySelector('picture');
    if (picture) imageCell = picture;
  }

  // Content cell: gather all content in left (h1, h2, a), and footer heading
  const contentElements = [];
  if (left) {
    // Get all element children in order
    left.childNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'BR') {
        contentElements.push(node);
      }
    });
  }
  if (footer) {
    const h3 = footer.querySelector('h3');
    if (h3) contentElements.push(h3);
  }

  // Table header as in the example
  const cells = [
    ['Hero'],
    [imageCell],
    [contentElements]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}

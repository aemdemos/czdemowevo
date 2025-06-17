/* global WebImporter */
export default function parse(element, { document }) {
  // Get hero-wrapper block
  const wrapper = element.querySelector('.hero-wrapper');
  let imageCell = '';
  let contentCell = '';

  if (wrapper) {
    // Main hero block
    const heroBlock = wrapper.querySelector('.hero.block');
    if (heroBlock) {
      // RIGHT: Collect first <picture> or image as background image cell
      const right = heroBlock.querySelector('.right');
      if (right) {
        const picture = right.querySelector('picture');
        if (picture) imageCell = picture;
      }

      // LEFT: All children (h1, h2, cta) as a single fragment
      const left = heroBlock.querySelector('.left');
      if (left) {
        const frag = document.createDocumentFragment();
        Array.from(left.children).forEach(child => frag.appendChild(child));
        contentCell = frag;
      }
    }
  }

  // Footer (optional): add contents beneath the main text, if present
  const footer = element.querySelector('.hero-footer');
  if (footer) {
    // Place on its own line below the main content, as in the example
    const frag = document.createDocumentFragment();
    if (contentCell) frag.appendChild(contentCell);
    // Add spacing if both present
    if (contentCell && footer.children.length) {
      frag.appendChild(document.createElement('br'));
      frag.appendChild(document.createElement('br'));
    }
    Array.from(footer.children).forEach(child => frag.appendChild(child));
    contentCell = frag;
  }

  // Compose the block table: 1 column, 3 rows
  const rows = [
    ['Hero'],
    [imageCell],
    [contentCell],
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

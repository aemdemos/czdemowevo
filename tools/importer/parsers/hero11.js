/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main hero block and its internal structure
  const heroWrapper = element.querySelector('.hero-wrapper');
  let heroBlock = null;
  let heroFooter = null;
  if (heroWrapper) {
    heroBlock = heroWrapper.querySelector('.hero.block');
    heroFooter = element.querySelector('.hero-footer');
  }

  const cellContent = [];

  // Extract image on right side, if present
  if (heroBlock) {
    const right = heroBlock.querySelector('.right');
    if (right) {
      const picture = right.querySelector('picture');
      if (picture) {
        cellContent.push(picture);
      }
    }
    // Extract title, subtitle, CTA in order from left
    const left = heroBlock.querySelector('.left');
    if (left) {
      Array.from(left.children).forEach(child => {
        cellContent.push(child);
      });
    }
  }

  // Extract hero-footer (additional subheading)
  if (heroFooter) {
    Array.from(heroFooter.children).forEach(child => {
      cellContent.push(child);
    });
  }

  // Compose the table as specified
  const rows = [
    ['Hero (hero11)'],
    [cellContent]
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

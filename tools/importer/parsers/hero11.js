/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the .hero.block
  const heroBlock = element.querySelector('.hero.block');
  let imageCell = '';
  let contentCell = [];

  // Extract image for the second row
  if (heroBlock) {
    const right = heroBlock.querySelector('.right');
    if (right) {
      const pic = right.querySelector('picture');
      if (pic) {
        imageCell = pic;
      } else {
        const img = right.querySelector('img');
        if (img) imageCell = img;
      }
    }
  }

  // Extract content for the third row (headings, cta, footer)
  if (heroBlock) {
    const left = heroBlock.querySelector('.left');
    if (left) {
      // h1, h2, a
      const nodes = [];
      const h1 = left.querySelector('h1');
      if (h1) nodes.push(h1);
      const h2 = left.querySelector('h2');
      if (h2) nodes.push(h2);
      const a = left.querySelector('a');
      if (a) nodes.push(a);
      contentCell = nodes;
    }
  }
  // Extract .hero-footer content (if present, typically a h3)
  const footer = element.querySelector('.hero-footer');
  if (footer) {
    Array.from(footer.children).forEach(child => {
      contentCell.push(child);
    });
  }

  // Build the table as per the example: header, image, text content
  const cells = [
    ['Hero'],
    [imageCell],
    [contentCell]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

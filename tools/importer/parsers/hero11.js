/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the hero block
  const heroBlock = element.querySelector('.hero.block');

  // Prepare image row content (second row in block)
  let imageCellContent = '';
  if (heroBlock) {
    const right = heroBlock.querySelector('.right');
    if (right) {
      const picture = right.querySelector('picture');
      if (picture) {
        imageCellContent = picture;
      }
    }
  }

  // Prepare content row (third row in block): headings, subheading, CTA, footer
  const contentCellElements = [];
  if (heroBlock) {
    const left = heroBlock.querySelector('.left');
    if (left) {
      // Add h1 if present
      const h1 = left.querySelector('h1');
      if (h1) contentCellElements.push(h1);
      // Add h2 if present
      const h2 = left.querySelector('h2');
      if (h2) contentCellElements.push(h2);
      // Add CTA link if present
      const a = left.querySelector('a');
      if (a) contentCellElements.push(a);
    }
  }
  // Add footer content (usually h3)
  const heroFooter = element.querySelector('.hero-footer');
  if (heroFooter) {
    Array.from(heroFooter.children).forEach(child => contentCellElements.push(child));
  }

  // Build table rows as per spec (header, image, content)
  const rows = [];
  // 1. Header row: block name, exactly as in the example
  rows.push(['Hero']);
  // 2. Image row (may be empty)
  rows.push([imageCellContent || '']);
  // 3. Content row (may be empty)
  rows.push([contentCellElements.length ? contentCellElements : '']);

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with our block
  element.replaceWith(block);
}

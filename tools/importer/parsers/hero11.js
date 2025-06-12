/* global WebImporter */
export default function parse(element, { document }) {
  // Find the hero block inside the wrapper
  const heroWrapper = element.querySelector('.hero-wrapper');
  if (!heroWrapper) return;
  const heroBlock = heroWrapper.querySelector('.hero.block');
  const heroFooter = heroWrapper.querySelector('.hero-footer');

  // Get image asset (picture tag from right div)
  let imageEl = '';
  if (heroBlock) {
    const right = heroBlock.querySelector('.right');
    if (right) {
      const picture = right.querySelector('picture');
      if (picture) imageEl = picture;
    }
  }

  // Gather content: heading, subheading, CTA, and footer
  const contentEls = [];
  if (heroBlock) {
    const left = heroBlock.querySelector('.left');
    if (left) {
      // Heading(s)
      left.querySelectorAll('h1, h2').forEach(el => contentEls.push(el));
      // CTA (button)
      const cta = left.querySelector('a.button');
      if (cta) contentEls.push(cta);
    }
  }
  // Footer content (e.g., h3)
  if (heroFooter) {
    heroFooter.querySelectorAll('h3, p').forEach(el => contentEls.push(el));
  }

  // Build the block table according to example (header row 'Hero', 1 column, 3 rows)
  const tableRows = [
    ['Hero'],
    [imageEl],
    [contentEls.length ? contentEls : ''],
  ];
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}

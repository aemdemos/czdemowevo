/* global WebImporter */
export default function parse(element, { document }) {
  // Locate main hero content
  const heroWrapper = element.querySelector('.hero-wrapper');
  if (!heroWrapper) return;
  const heroBlock = heroWrapper.querySelector('.hero.block');
  if (!heroBlock) return;
  const left = heroBlock.querySelector('.left');
  const right = heroBlock.querySelector('.right');

  // Header row (must be exactly 'Hero')
  const headerRow = ['Hero'];

  // Image row (only the <img> element from <picture> if present)
  let imageCell = '';
  if (right) {
    const img = right.querySelector('img');
    if (img) imageCell = img;
  }
  const imageRow = [imageCell];

  // Content row: all text & button from left, plus .hero-footer
  const content = [];
  if (left) {
    const h1 = left.querySelector('h1');
    if (h1) content.push(h1);
    const h2 = left.querySelector('h2');
    if (h2) content.push(h2);
    const a = left.querySelector('a');
    if (a) content.push(a);
  }
  const heroFooter = element.querySelector('.hero-footer');
  if (heroFooter) {
    Array.from(heroFooter.children).forEach((el) => content.push(el));
  }
  const contentRow = [content.length === 1 ? content[0] : (content.length > 1 ? content : '')];

  // Compose and replace
  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

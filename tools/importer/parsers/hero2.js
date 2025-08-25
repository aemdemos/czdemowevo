/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct child by selector
  function directChild(el, selector) {
    return Array.from(el.children).find(child => child.matches(selector));
  }
  // Find .hero.block
  const heroWrapper = element.querySelector('.hero-wrapper');
  let block = null;
  if (heroWrapper) {
    block = heroWrapper.querySelector('.hero.block');
  } else {
    block = element.querySelector('.hero.block');
  }
  // Left (text), Right (image)
  let left = null, right = null;
  if (block) {
    left = directChild(block, '.left');
    right = directChild(block, '.right');
  }
  // Get main image from right side
  let heroImg = '';
  if (right) {
    const pic = right.querySelector('picture');
    if (pic) {
      const img = pic.querySelector('img');
      if (img) {
        heroImg = img;
      }
    }
  }
  // Compose text/cta cell (row 3)
  const contentCell = [];
  if (left) {
    const h1 = left.querySelector('h1');
    if (h1) contentCell.push(h1);
    const h2 = left.querySelector('h2');
    if (h2) contentCell.push(h2);
    const cta = left.querySelector('a');
    if (cta) contentCell.push(cta);
  }
  // Add hero-footer (can contain h3 or other footer info)
  const heroFooter = element.querySelector('.hero-footer');
  if (heroFooter) {
    for (const child of Array.from(heroFooter.children)) {
      contentCell.push(child);
    }
  }
  // Compose final rows as per the example markdown
  const rows = [
    ['Hero'],
    [heroImg || ''],
    [contentCell.length ? contentCell : '']
  ];
  // Build the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}

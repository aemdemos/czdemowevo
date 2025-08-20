/* global WebImporter */
export default function parse(element, { document }) {
  // Get the hero block wrapper
  const heroBlock = element.querySelector('.hero.block');
  let picture = '';
  if (heroBlock) {
    const right = heroBlock.querySelector('.right');
    if (right) {
      picture = right.querySelector('picture, img');
    }
  }

  // Gather hero content (headings, subheading, CTA)
  let contentParts = [];
  if (heroBlock) {
    const left = heroBlock.querySelector('.left');
    if (left) {
      // All headings (in order)
      left.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(h => contentParts.push(h));
      // CTA button/link (not already in contentParts)
      const cta = left.querySelector('a.button, a.primary, a:not([href="#"])');
      if (cta && !contentParts.includes(cta)) {
        contentParts.push(cta);
      }
    }
  }

  // Check for any hero-footer (e.g., additional heading/subheading)
  const heroFooter = element.querySelector('.hero-footer');
  if (heroFooter) {
    // Add all children of hero-footer (often h3/heading)
    Array.from(heroFooter.children).forEach(child => contentParts.push(child));
  }

  // If no contentParts, add empty string to match correct row count
  if (contentParts.length === 0) contentParts = [''];

  // Build table structure as per the example: 1col, 3 rows; header must be 'Hero'
  const cells = [
    ['Hero'],
    [picture || ''],
    [contentParts]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

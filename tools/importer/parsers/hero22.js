/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block table
  const headerRow = ['Hero (hero22)'];

  // Find the hero-wrapper and main hero block
  const heroWrapper = element.querySelector('.hero-wrapper');
  let left, right;
  if (heroWrapper) {
    left = heroWrapper.querySelector('.left');
    right = heroWrapper.querySelector('.right');
  }

  // Content extraction from .left
  // Title (mandatory)
  const title = left ? left.querySelector('h1') : null;
  // Subheading (optional)
  const subheading = left ? left.querySelector('h2') : null;
  // Call-to-action (optional)
  const cta = left ? left.querySelector('a.button') : null;

  // Content extraction from .right
  // Hero image (optional)
  const picture = right ? right.querySelector('picture') : null;

  // Footer text (optional)
  const heroFooter = element.querySelector('.hero-footer');
  const footerText = heroFooter ? heroFooter.querySelector('h3') : null;

  // Compose the cell content in the specified order: image, title, subheading, cta, footer
  const cellContent = [];
  if (picture) cellContent.push(picture);
  if (title) cellContent.push(title);
  if (subheading) cellContent.push(subheading);
  if (cta) cellContent.push(cta);
  if (footerText) cellContent.push(footerText);

  // If everything is missing, add an empty string as a fallback to avoid an empty cell
  if (cellContent.length === 0) cellContent.push('');

  // Create the table rows as specified: header row, one content row (1 column)
  const tableCells = [
    headerRow,
    [cellContent]
  ];

  // Create and replace with the block table
  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(table);
}

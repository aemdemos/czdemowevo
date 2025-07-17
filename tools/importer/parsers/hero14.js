/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const headerRow = ['Hero'];
  // Second row: background image (none in the provided HTML)
  const imageRow = [''];
  // Third row: All text content as a block (preserving formatting)

  // Find the .footer-links container (contains copyright and policy text)
  const footerLinks = element.querySelector('.footer-links');
  // If found, collect all its children (should be <p>s and <ul>)
  let contentEls = [];
  if (footerLinks) {
    // Get all direct children (not recursive)
    contentEls = Array.from(footerLinks.children).filter(
      (el) => el.textContent.trim() !== ''
    );
    // fallback: if empty (shouldn't happen), push empty string
    if (!contentEls.length) contentEls = [''];
  } else {
    // fallback: if .footer-links missing, push empty string
    contentEls = [''];
  }

  const cells = [
    headerRow,
    imageRow,
    [contentEls],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

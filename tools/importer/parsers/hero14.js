/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the main block div inside the footer
  const blockDiv = element.querySelector(':scope > div');
  if (!blockDiv) {
    // fallback: nothing to parse
    element.replaceWith(WebImporter.DOMUtils.createTable([
      ['Hero'],
      [''],
      ['']
    ], document));
    return;
  }

  // Find .footer-social and .footer-links for all main content
  const socialDiv = blockDiv.querySelector('.footer-social');
  const linksDiv = blockDiv.querySelector('.footer-links');

  // Prepare the second row (image/background): include logo + social icons
  // If no .footer-social, create an empty string
  const imageRow = [socialDiv ? socialDiv : ''];

  // Prepare the third row (content): include headline, subheading, call-to-action, etc.
  // For this footer, this is all text and links from .footer-links
  const contentRow = [linksDiv ? linksDiv : ''];

  // Build the table as per the block definition (1 col, 3 rows)
  const cells = [
    ['Hero'], // header row - must match block name exactly
    imageRow,
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Only replace with the table (no section metadata, no <hr> needed)
  element.replaceWith(table);
}

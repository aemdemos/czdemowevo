/* global WebImporter */
export default function parse(element, { document }) {
  // The block header, as specified
  const headerRow = ['Quote (quoteWithAttribution6)'];

  // Find .quote.block inside the given element
  const quoteDiv = element.querySelector('.quote.block');
  let quoteContent = '';
  let attributionContent = '';

  if (quoteDiv) {
    // Find the innermost div containing the content
    // Sometimes structure can vary, so drill down to get all <p> descendants
    const ps = quoteDiv.querySelectorAll('p');
    if (ps.length > 0) {
      // The quote is the first paragraph
      quoteContent = ps[0];
    }
    if (ps.length > 1) {
      // Attribution/signature is the second (or next) paragraph
      attributionContent = ps[1];
    }
  }

  // Table rows per the block definition
  const cells = [
    headerRow,
    [quoteContent || ''],
    [attributionContent || '']
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

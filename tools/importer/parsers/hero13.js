/* global WebImporter */
export default function parse(element, { document }) {
  // The block structure: [ ['Hero'], [Image (optional)], [Text content] ]

  // Find the quote block
  const quoteBlock = element.querySelector('.quote.block');
  let imageCell = '';
  let contentCell = '';

  if (quoteBlock) {
    // Find all paragraphs inside the innermost div
    // Structure: .quote.block > div > div > p, p
    const innerDivs = quoteBlock.querySelectorAll(':scope > div > div');
    if (innerDivs.length > 0) {
      const ps = innerDivs[0].querySelectorAll('p');
      // The quote text is the first p
      if (ps.length > 0) {
        // Use the full element (to preserve formatting if present)
        contentCell = ps[0];
      }
      // The image is in a picture tag inside the second p
      if (ps.length > 1) {
        const picture = ps[1].querySelector('picture');
        if (picture) {
          imageCell = picture;
        }
      }
    }
  }

  // Build the table: always 1 column, 3 rows (header, optional image, content)
  const cells = [
    ['Hero'],
    [imageCell],
    [contentCell]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

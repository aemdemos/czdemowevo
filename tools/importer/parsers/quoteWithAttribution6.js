/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified
  const headerRow = ['Quote (quoteWithAttribution6)'];

  // Find the quote content
  // Structure: .quote-wrapper > .quote.block > div > div > p (quote) + p (image)
  const quoteWrapper = element.querySelector('.quote-wrapper');
  let contentDiv = null;
  if (quoteWrapper) {
    const quoteBlock = quoteWrapper.querySelector('.quote.block');
    if (quoteBlock) {
      // The innermost content is in quoteBlock > div > div
      const blockDiv = quoteBlock.querySelector('div');
      if (blockDiv) {
        contentDiv = blockDiv.querySelector('div') || blockDiv;
      }
    }
  }

  let quoteRow = [''];
  if (contentDiv) {
    // Collect all children of contentDiv (should be <p>s with text and picture)
    const quoteContent = Array.from(contentDiv.children);
    if (quoteContent.length) {
      quoteRow = [quoteContent];
    }
  }

  // Attribution row: no explicit attribution present in this HTML, so empty string
  const attributionRow = [''];

  const cells = [
    headerRow,
    quoteRow,
    attributionRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

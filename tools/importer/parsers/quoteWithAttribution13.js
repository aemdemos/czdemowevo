/* global WebImporter */
export default function parse(element, { document }) {
  // Block name header exactly as specified
  const headerRow = ['Quote (quoteWithAttribution13)'];

  // Attempt to get .quote.block inside the given element
  const quoteBlock = element.querySelector('.quote.block');

  let quoteText = null;
  let attribution = null;

  if (quoteBlock) {
    // Find the first div > div (structure is: .quote.block > div > div)
    const inner = quoteBlock.querySelector('div > div');
    if (inner) {
      const paragraphs = inner.querySelectorAll('p');
      // First p is the quote text; can include <br>, formatting etc.
      if (paragraphs.length > 0) {
        quoteText = paragraphs[0];
      }
      // Second p, if any, is attribution (may contain a picture/signature)
      if (paragraphs.length > 1) {
        attribution = paragraphs[1];
      }
    }
  }

  // Fallbacks in case expected structure is missing
  if (!quoteText) {
    // Try to find a p in the element as a last resort
    quoteText = element.querySelector('p');
  }
  // If still no attribution, leave null (empty row)

  // Compose cells. Each row is a single cell as per requirements.
  const cells = [
    headerRow,
    [quoteText],
    [attribution]
  ];

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

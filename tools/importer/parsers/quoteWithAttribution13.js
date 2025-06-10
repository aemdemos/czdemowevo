/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match exactly
  const headerRow = ['Quote (quoteWithAttribution13)'];

  // Extract quote and attribution
  // The structure: .quote-container > .quote-wrapper > .quote.block > div > div > (p, p/picture)
  let quoteText = null;
  let attribution = '';

  // Find the main content div inside the block
  const quoteInner = element.querySelector('.quote.block > div > div')
    || element.querySelector('.quote.block > div')
    || element.querySelector('.quote.block');

  let ps = [];
  if (quoteInner) {
    // Only direct children p's for stability
    ps = Array.from(quoteInner.querySelectorAll(':scope > p'));
  }

  // The quote is always the first <p>
  if (ps.length > 0) {
    quoteText = ps[0];
  }

  // Attribution: usually the next sibling <p> if it contains an image/signature, or a signature image by itself
  // Start with anything after the quote <p> in the DOM tree
  let attributionElems = [];
  if (quoteText) {
    let next = quoteText.nextElementSibling;
    while (next) {
      // Only include if it's not empty
      if (next.textContent.trim() || next.querySelector('img, picture')) {
        attributionElems.push(next);
      }
      next = next.nextElementSibling;
    }
  }
  // If nothing found, look for pictures or images directly under quoteInner
  if (attributionElems.length === 0 && quoteInner) {
    const directPictures = Array.from(quoteInner.querySelectorAll(':scope > picture, :scope > img'));
    directPictures.forEach(pic => {
      // Avoid duplicates if already in attributionElems
      if (!attributionElems.includes(pic)) {
        attributionElems.push(pic);
      }
    });
  }

  // Clean up attribution: only keep non-empty or images
  attributionElems = attributionElems.filter(el => el.textContent.trim() || el.querySelector('img, picture'));
  if (attributionElems.length === 1) attribution = attributionElems[0];
  else if (attributionElems.length > 1) attribution = attributionElems;
  else attribution = '';

  // Compose the cells: always 1 column, 3 rows
  const cells = [
    headerRow,
    [quoteText],
    [attribution],
  ];

  // Build the table and replace the element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

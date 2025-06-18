/* global WebImporter */
export default function parse(element, { document }) {
  // Find the quote block and extract the quote text and image
  let contentCell = [];
  const quoteBlock = element.querySelector('.quote.block');
  if (quoteBlock) {
    // Look for the relevant p tags
    const innerDivs = quoteBlock.querySelectorAll(':scope > div > div');
    innerDivs.forEach((div) => {
      // Add all direct children (should be <p> elements)
      Array.from(div.children).forEach(child => {
        // Only add if node is element and an allowed tag
        if (child.tagName === 'P') {
          contentCell.push(child);
        }
      });
    });
  }
  // Compose the table
  const cells = [
    ['Hero'],
    [''],
    [contentCell.length ? contentCell : '']
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

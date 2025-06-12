/* global WebImporter */
export default function parse(element, { document }) {
  // Table header matches the example exactly
  const headerRow = ['Hero'];

  // Extract background image from data-background-image
  const bgUrl = element.getAttribute('data-background-image');
  let backgroundImgEl = '';
  if (bgUrl) {
    const img = document.createElement('img');
    img.src = bgUrl;
    img.alt = '';
    backgroundImgEl = img;
  }

  // Extract content from block
  let contentCell = [];
  const columnsWrapper = element.querySelector('.columns-wrapper');
  if (columnsWrapper) {
    const columnsBlock = columnsWrapper.querySelector('.columns.block');
    if (columnsBlock) {
      const cols = columnsBlock.querySelectorAll(':scope > div');
      if (cols.length >= 2) {
        const rightCol = cols[1];
        const items = [];
        // Heading (h2)
        const h2 = rightCol.querySelector('h2');
        if (h2) items.push(h2);
        // All paragraphs except button-container
        rightCol.querySelectorAll('p:not(.button-container)')
          .forEach(p => items.push(p));
        // Button (optional) -- move the link ('a') itself
        const buttonContainer = rightCol.querySelector('p.button-container');
        if (buttonContainer) {
          const btn = buttonContainer.querySelector('a');
          if (btn) items.push(btn);
        }
        contentCell = items;
      }
    }
  }
  // Ensure contentCell is always an array
  if (!Array.isArray(contentCell)) contentCell = contentCell ? [contentCell] : [];

  // Compose the table
  const cells = [
    headerRow,
    [backgroundImgEl || ''],
    [contentCell.length ? contentCell : ''],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

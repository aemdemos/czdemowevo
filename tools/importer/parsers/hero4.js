/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row exactly as in the example
  const headerRow = ['Hero'];

  // 2. Background image row
  // Use data-background-image attribute as the background image asset
  const bgImageUrl = element.getAttribute('data-background-image');
  let bgImgEl = '';
  if (bgImageUrl) {
    bgImgEl = document.createElement('img');
    bgImgEl.src = bgImageUrl;
    bgImgEl.alt = '';
  }

  // 3. Content row (heading, subheading, paragraph, CTA)
  // Find the text content column
  const textCol = element.querySelector('.background-image-column');
  const contentEls = [];
  if (textCol) {
    // Add heading(s)
    const heading = textCol.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) contentEls.push(heading);
    // Add all paragraphs except for button containers
    textCol.querySelectorAll('p:not(.button-container)').forEach(p => {
      contentEls.push(p);
    });
    // Add button if present
    const btnContainer = textCol.querySelector('.button-container');
    if (btnContainer) contentEls.push(btnContainer);
  }

  // Compose the table: 1 column, 3 rows
  const cells = [
    headerRow,
    [bgImgEl || ''],
    [contentEls]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the constructed table
  element.replaceWith(table);
}

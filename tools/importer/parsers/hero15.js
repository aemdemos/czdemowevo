/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row from example markdown
  const headerRow = ['Hero'];

  // 2. Second row: Background image from data-background-image attribute (if present)
  let bgImgEl = '';
  const bgImgUrl = element.getAttribute('data-background-image');
  if (bgImgUrl) {
    const img = document.createElement('img');
    img.src = bgImgUrl;
    img.alt = '';
    bgImgEl = img;
  }

  // 3. Third row: headline, paragraphs, cta button (all from the right/column with .background-image-column)
  let contentCell = [];
  const bgImgColumn = element.querySelector('.background-image-column');
  if (bgImgColumn) {
    // Headline (h2)
    const h2 = bgImgColumn.querySelector('h2');
    if (h2) contentCell.push(h2);
    // Paragraphs that are not button container
    const ps = bgImgColumn.querySelectorAll('p:not(.button-container)');
    ps.forEach((p) => contentCell.push(p));
    // CTA/Button
    const btnContainer = bgImgColumn.querySelector('.button-container');
    if (btnContainer) contentCell.push(btnContainer);
  }

  // Structure rows as per the markdown example
  const cells = [
    headerRow,
    [bgImgEl],
    [contentCell],
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // No section metadata in example, so no <hr> or metadata table
  element.replaceWith(block);
}

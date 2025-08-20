/* global WebImporter */
export default function parse(element, { document }) {
  // Extract background image from data-background-image
  const bgImgUrl = element.getAttribute('data-background-image');
  let bgImgEl = '';
  if (bgImgUrl) {
    const img = document.createElement('img');
    img.src = bgImgUrl;
    img.setAttribute('loading', 'lazy');
    img.alt = '';
    bgImgEl = img;
  }

  // Find the text column (second column)
  const columns = element.querySelectorAll(':scope .columns > div');
  let textCol = null;
  if (columns.length === 2) {
    textCol = columns[1];
  } else if (columns.length === 1) {
    textCol = columns[0];
  }

  let contentEls = [];
  if (textCol) {
    // Heading (keep the highest-level heading)
    const heading = textCol.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) contentEls.push(heading);
    // Paragraphs except button paragraph
    const paragraphs = Array.from(textCol.querySelectorAll('p')).filter(p => !p.classList.contains('button-container'));
    contentEls = contentEls.concat(paragraphs);
    // Button (optional)
    const button = textCol.querySelector('.button-container');
    if (button) contentEls.push(button);
  }

  // Compose table following block spec: 1 col, 3 rows, header 'Hero'
  const cells = [
    ['Hero'],
    [bgImgEl || ''],
    [contentEls.length ? contentEls : '']
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

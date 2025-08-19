/* global WebImporter */
export default function parse(element, { document }) {
  // Block header matches the example: 'Hero'
  const headerRow = ['Hero'];

  // Background image from data-background-image attribute (example: decorative background)
  let bgImgElem = '';
  const bgImgUrl = element.getAttribute('data-background-image');
  if (bgImgUrl) {
    const img = document.createElement('img');
    img.src = bgImgUrl;
    img.alt = '';
    bgImgElem = img;
  }

  // Textual content: Headline, Subheading, Paragraphs, CTA (in correct order)
  const rightCol = element.querySelector('.background-image-column');
  const textElems = [];
  if (rightCol) {
    // Headline (h1-h6, only first)
    const heading = rightCol.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) textElems.push(heading);
    // All paragraphs except button-container
    rightCol.querySelectorAll('p:not(.button-container)').forEach(p => textElems.push(p));
    // CTA (button-container)
    const buttonCtn = rightCol.querySelector('.button-container');
    if (buttonCtn) textElems.push(buttonCtn);
  }

  // Construct block table as per example (1 column, 3 rows)
  const cells = [
    headerRow,
    [bgImgElem],
    [textElems]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

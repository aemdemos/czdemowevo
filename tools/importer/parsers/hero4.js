/* global WebImporter */
export default function parse(element, { document }) {
  // Extract background image from data-background-image attribute
  const bgImgUrl = element.getAttribute('data-background-image');
  let bgImgElem = null;
  if (bgImgUrl) {
    bgImgElem = document.createElement('img');
    bgImgElem.src = bgImgUrl;
    bgImgElem.alt = '';
  }

  // Find the text content (heading, paragraph, CTA)
  let heading = null, paragraph = null, cta = null;
  const columnsBlock = element.querySelector('.columns.block');
  if (columnsBlock) {
    // The first child is usually the column containing content
    const mainRow = columnsBlock.querySelector('div');
    if (mainRow) {
      const textCol = mainRow.querySelector('.background-image-column');
      if (textCol) {
        heading = textCol.querySelector('h1, h2, h3, h4, h5, h6');
        // All paragraphs except button container
        const paragraphs = Array.from(textCol.querySelectorAll('p')).filter(p => !p.classList.contains('button-container'));
        if (paragraphs.length) paragraph = paragraphs[0];
        // CTA button
        const buttonP = textCol.querySelector('p.button-container');
        if (buttonP) {
          const a = buttonP.querySelector('a');
          if (a) cta = a;
        }
      }
    }
  }

  // Compose the content cell (all present text elements in order)
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (paragraph) contentCell.push(paragraph);
  if (cta) contentCell.push(cta);

  // Build output table as per the required block structure
  const cells = [
    ['Hero'],
    [bgImgElem ? bgImgElem : ''],
    [contentCell]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}

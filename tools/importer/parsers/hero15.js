/* global WebImporter */
export default function parse(element, { document }) {
  // Get background image from data-background-image attribute
  const bgUrl = element.getAttribute('data-background-image');
  let bgImgEl = null;
  if (bgUrl) {
    bgImgEl = document.createElement('img');
    bgImgEl.src = bgUrl;
    bgImgEl.alt = '';
  }

  // Find the column that contains the headline and text content
  const colsBlock = element.querySelector('.columns.block');
  let contentCol = null;
  if (colsBlock) {
    const cols = colsBlock.querySelectorAll(':scope > div');
    for (const col of cols) {
      if (col.querySelector('h1, h2, h3, h4, h5, h6')) {
        contentCol = col;
        break;
      }
    }
    if (!contentCol && cols.length > 1) contentCol = cols[1];
    if (!contentCol && cols.length === 1) contentCol = cols[0];
  }

  // Gather content for the third row
  let heroContent = [];
  if (contentCol) {
    // Heading
    const heading = contentCol.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) heroContent.push(heading);
    // All paragraphs except button-container
    const paragraphs = Array.from(contentCol.querySelectorAll('p:not(.button-container)'));
    heroContent.push(...paragraphs);
    // Call-to-action button
    const buttonContainer = contentCol.querySelector('p.button-container');
    if (buttonContainer) heroContent.push(buttonContainer);
  }

  // Build the required table
  const table = WebImporter.DOMUtils.createTable([
    ['Hero'],
    [bgImgEl ? bgImgEl : ''],
    [heroContent.length ? heroContent : '']
  ], document);
  
  // Replace the original element with the new table
  element.replaceWith(table);
}

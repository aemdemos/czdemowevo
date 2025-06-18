/* global WebImporter */
export default function parse(element, { document }) {
  // Extract background image URL from data-background-image
  const bgImgUrl = element.getAttribute('data-background-image');
  // Get all direct children columns
  const columnsWrapper = element.querySelector('.columns-wrapper');
  let mainImgCell = '';
  let mainContentFragments = [];

  if (columnsWrapper) {
    // Attempt to get left and right columns
    const topLevelCols = columnsWrapper.querySelectorAll(':scope > .columns.block > div');
    let rightCol = null;
    if (topLevelCols.length === 2) {
      // Left: image, Right: content
      const leftCol = topLevelCols[0];
      rightCol = topLevelCols[1];
      // Find first picture or img in left column
      if (leftCol) {
        let picture = leftCol.querySelector('picture');
        if (picture) {
          mainImgCell = picture;
        }
      }
    } else {
      // fallback: try find image in the whole wrapper
      let picture = columnsWrapper.querySelector('picture');
      if (picture) mainImgCell = picture;
      rightCol = columnsWrapper;
    }
    // For main content: headline, subheading, button, etc from rightCol
    if (rightCol) {
      // Heading (use h1, then h2, then h3)
      const heading = rightCol.querySelector('h1, h2, h3');
      if (heading) mainContentFragments.push(heading);
      // Paragraphs (not .button-container)
      const paragraphs = Array.from(rightCol.querySelectorAll('p:not(.button-container)'));
      paragraphs.forEach(p => mainContentFragments.push(p));
      // Call-to-action button (inside .button-container)
      const buttonContainer = rightCol.querySelector('.button-container');
      if (buttonContainer) {
        const cta = buttonContainer.querySelector('a.button');
        if (cta) mainContentFragments.push(cta);
      }
    }
  }

  // Table structure per example: header row, background image row, content row
  const tableRows = [
    ['Hero'],
    [bgImgUrl ? (() => { const img = document.createElement('img'); img.src = bgImgUrl; img.alt = ''; return img; })() : ''],
    [mainContentFragments.length ? mainContentFragments : '']
  ];
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}

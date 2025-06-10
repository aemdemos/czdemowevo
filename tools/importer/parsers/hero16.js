/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const headerRow = ['Hero (hero16)'];

  // Find the two columns inside the hero block
  let heading = null;
  let subheading = null;
  let cta = null;

  // Locate the .columns.block container (it contains the two columns)
  const columnsBlock = element.querySelector('.columns.block');
  if (columnsBlock) {
    const cols = columnsBlock.querySelectorAll(':scope > div');
    if (cols.length === 2) {
      // Right column contains heading, text, button
      const rightCol = cols[1];
      const bgCol = rightCol.querySelector('.background-image-column');
      if (bgCol) {
        // Get heading (mandatory)
        heading = bgCol.querySelector('h1, h2, h3, h4, h5, h6');
        // Get all paragraphs that are NOT part of button-container
        const paragraphs = Array.from(bgCol.querySelectorAll('p:not(.button-container)'));
        if (paragraphs.length > 0) {
          // All paragraphs in subheading fragment
          subheading = document.createDocumentFragment();
          paragraphs.forEach((p) => subheading.appendChild(p));
        }
        // Get CTA (optional)
        const btnContainer = bgCol.querySelector('p.button-container, div.button-container');
        if (btnContainer && btnContainer.querySelector('a')) {
          cta = btnContainer;
        }
      }
    }
  }

  // Compose the cell in order: heading, subheading, cta (NO image per example)
  const cellContent = [];
  if (heading) cellContent.push(heading);
  if (subheading && subheading.childNodes.length > 0) cellContent.push(subheading);
  if (cta) cellContent.push(cta);

  if (cellContent.length === 0) return;

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    [cellContent],
  ], document);

  element.replaceWith(table);
}

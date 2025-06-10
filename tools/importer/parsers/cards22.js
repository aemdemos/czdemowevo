/* global WebImporter */
export default function parse(element, { document }) {
  // The header row should have exactly one column with the block name
  const headerRow = ['Cards (cards22)'];

  // Prepare the card rows: each row is a card with two columns (image, text)
  const cardRows = [];
  const columnsBlock = element.querySelector('.columns.block');
  if (columnsBlock) {
    // Each direct child div of columnsBlock is a card
    const cardDivs = columnsBlock.querySelectorAll(':scope > div');
    cardDivs.forEach((cardDiv) => {
      // Find the image in .columns-img-col, fallback to picture/img in cardDiv
      let imgCol = cardDiv.querySelector('.columns-img-col');
      let imgElement = null;
      if (imgCol) {
        imgElement = imgCol.querySelector('picture, img');
      } else {
        imgElement = cardDiv.querySelector('picture, img');
      }
      if (imgElement && imgElement.tagName === 'IMG' && imgElement.parentElement && imgElement.parentElement.tagName === 'PICTURE') {
        imgElement = imgElement.parentElement;
      }
      // Find the text column: the div that is not the image column
      let textCol = null;
      const innerDivs = cardDiv.querySelectorAll(':scope > div');
      if (innerDivs.length > 1) {
        textCol = Array.from(innerDivs).find(d => !d.classList.contains('columns-img-col'));
      } else if (innerDivs.length === 1 && (!imgCol || innerDivs[0] !== imgCol)) {
        textCol = innerDivs[0];
      } else {
        textCol = cardDiv;
      }
      // Only include heading elements and paragraphs in textCol
      const textEls = [];
      Array.from(textCol.children).forEach(child => {
        if (/^H[1-6]$/.test(child.tagName) || child.tagName === 'P') {
          textEls.push(child);
        }
      });
      const textContent = textEls.length ? textEls : [textCol];
      cardRows.push([imgElement, textContent]);
    });
  }
  // Compose final table: first row is header (single cell), then each card row has two columns
  const rows = [headerRow, ...cardRows];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

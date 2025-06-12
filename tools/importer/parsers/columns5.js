/* global WebImporter */
export default function parse(element, { document }) {
  // Set the header row for columns5, exact per instructions
  const headerRow = ['Columns (columns5)'];

  // Find the columns block itself (in case element is columns-wrapper)
  let columnsBlock = element;
  if (columnsBlock.classList.contains('columns-wrapper')) {
    const found = columnsBlock.querySelector('.columns.block');
    if (found) columnsBlock = found;
  }

  // Get the column containers: direct children divs (should be 2)
  const colDivs = Array.from(columnsBlock.children).filter(c => c.tagName === 'DIV');
  // Defensive: handle columns coded as nested divs (sometimes columns block has one div containing two children)
  let contentCols = colDivs;
  if (colDivs.length === 1 && colDivs[0].children.length === 2) {
    contentCols = Array.from(colDivs[0].children);
  }

  // If still not 2, see if there's any picture sibling in children
  if (contentCols.length < 2) {
    // Try to find a sibling picture
    const innerDivs = Array.from(columnsBlock.querySelectorAll(':scope > div > div'));
    if (innerDivs.length >= 2) {
      contentCols = [innerDivs[0], innerDivs[1]];
    }
  }

  // Defensive: if somehow still not 2 columns, fallback to empty divs
  const leftCol = contentCols[0] || document.createElement('div');
  const rightCol = contentCols[1] || document.createElement('div');

  // Compose the 2-column row; reference existing nodes directly
  const row = [leftCol, rightCol];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row
  ], document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}

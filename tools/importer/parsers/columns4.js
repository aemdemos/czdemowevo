/* global WebImporter */
export default function parse(element, { document }) {
  // Find the nested columns block
  const columnsWrapper = element.querySelector('.columns-wrapper');
  if (!columnsWrapper) return;
  const columnsBlock = columnsWrapper.querySelector('.columns.block');
  if (!columnsBlock) return;

  // There is one child div of columns.block which contains the two columns
  const rowDiv = columnsBlock.querySelector(':scope > div');
  if (!rowDiv) return;
  const colDivs = Array.from(rowDiv.children);

  // First column: image column (contains <picture>)
  const imgCol = colDivs.find(div => div.classList.contains('columns-img-col'));
  // Reference the entire .columns-img-col div as the cell
  const imgCell = imgCol || '';

  // Second column: background image column (contains heading, paragraphs, button)
  const backgroundCol = colDivs.find(div => div.classList.contains('background-image-column'));
  let contentCell = [];
  if (backgroundCol) {
    // Ignore the decorative background-image div
    // Collect heading, normal paragraphs, and button paragraphs
    const heading = backgroundCol.querySelector('h2');
    if (heading) contentCell.push(heading);
    backgroundCol.querySelectorAll('p:not(.button-container)').forEach(p => contentCell.push(p));
    const buttonContainer = backgroundCol.querySelector('.button-container');
    if (buttonContainer) contentCell.push(buttonContainer);
  } else {
    contentCell = '';
  }

  // Table header must match: Columns (columns4)
  const headerRow = ['Columns (columns4)'];
  const contentRow = [imgCell, contentCell];

  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

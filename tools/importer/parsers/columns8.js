/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns block inside the input element
  const columnsWrapper = element.querySelector('.columns-wrapper');
  let columnsBlock = null;
  if (columnsWrapper) {
    columnsBlock = columnsWrapper.querySelector('.columns.block');
  } else {
    columnsBlock = element.querySelector('.columns.block');
  }
  if (!columnsBlock) return;

  // Get the direct children representing columns
  // In this HTML: .columns.block > div > div (for each column)
  const columnsInnerRow = columnsBlock.querySelector('div');
  if (!columnsInnerRow) return;
  const columnDivs = Array.from(columnsInnerRow.children);
  if (columnDivs.length < 2) return; // Should have two columns

  // First column: may have .columns-img-col > picture/img
  let firstColContent = null;
  const imgCol = columnDivs[0];
  // Use whatever is inside the first column (image div)
  if (imgCol) {
    // Prefer picture, but fallback to whole div if not.
    const picture = imgCol.querySelector('picture');
    if (picture) {
      firstColContent = picture;
    } else {
      firstColContent = imgCol;
    }
  }

  // Second column: text (heading + paragraph)
  const textCol = columnDivs[1];
  // Use the entire div for resilience, so heading and paragraph included

  // Table header must be exactly as specified
  const headerRow = ['Columns (columns8)'];
  const row = [firstColContent, textCol];

  const table = WebImporter.DOMUtils.createTable([headerRow, row], document);

  element.replaceWith(table);
}
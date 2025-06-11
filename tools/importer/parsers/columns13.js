/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns-wrapper within the section
  const columnsWrapper = element.querySelector('.columns-wrapper');
  if (!columnsWrapper) return;

  // Find the columns.block inside columnsWrapper
  const columnsBlock = columnsWrapper.querySelector('.columns.block');
  if (!columnsBlock) return;

  // The columns block contains a single row div. Its children are the columns (normally two columns for columns13)
  const rowDiv = columnsBlock.querySelector(':scope > div');
  if (!rowDiv) return;
  const columnDivs = Array.from(rowDiv.children);
  if (!columnDivs.length) return;

  // Header row must be a single column
  const headerRow = ['Columns (columns13)'];
  // Second row: as many columns as there are columns in the block (usually 2, but should be dynamic)
  const columnsRow = columnDivs;

  // Pass headerRow as a single array for the header, columnsRow as an array for the second row
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}

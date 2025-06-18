/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns block inside the section
  const columnsWrapper = element.querySelector('.columns-wrapper');
  if (!columnsWrapper) return;
  const columnsBlock = columnsWrapper.querySelector('.columns.block');
  if (!columnsBlock) return;
  // Within columnsBlock, get the row containing columns
  const rowDiv = columnsBlock.querySelector(':scope > div');
  if (!rowDiv) return;
  // In the rowDiv, each direct <div> is a column
  const columnDivs = Array.from(rowDiv.children);
  if (!columnDivs.length) return;
  // Build the table rows
  // Header row: exactly one cell, as per example
  const headerRow = ['Columns (columns8)'];
  // Content row: one cell per column
  const dataRow = columnDivs;
  // Create the table with the correct header/content structure
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    dataRow
  ], document);
  // Replace the original element with the new block table
  element.replaceWith(table);
}

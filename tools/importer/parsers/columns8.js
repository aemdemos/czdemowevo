/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .columns-wrapper inside the section
  const columnsWrapper = element.querySelector('.columns-wrapper');
  if (!columnsWrapper) return;
  // Find the .columns.block inside the wrapper
  const columnsBlock = columnsWrapper.querySelector('.columns.block');
  if (!columnsBlock) return;
  
  // The columns block should have a single child <div>, which contains the actual columns
  let rowContainer = columnsBlock.querySelector(':scope > div');
  if (!rowContainer) rowContainer = columnsBlock;
  // Get array of column divs
  const columnDivs = Array.from(rowContainer.children).filter(col => col && col.childElementCount > 0);
  if (columnDivs.length < 2) return;

  // Build the header row as a single cell array
  const headerRow = ['Columns (columns8)'];
  // Build the content row: array of column elements — as many as appear in the HTML
  const contentRow = columnDivs;

  // Compose the cells array: single-cell header, then multi-cell content row
  const cells = [headerRow, contentRow];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Set the th to span the number of columns
  const th = table.querySelector('th');
  if (th && columnDivs.length > 1) {
    th.setAttribute('colspan', columnDivs.length);
  }

  // Replace the original element
  element.replaceWith(table);
}

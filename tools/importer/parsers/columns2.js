/* global WebImporter */
export default function parse(element, { document }) {
  // Find the actual columns block inside the wrapper
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get the immediate column containers
  const columnDivs = Array.from(columnsBlock.querySelectorAll(':scope > div'));
  // Defensive: If there are not enough columns, abort
  if (columnDivs.length < 2) return;

  // For robustness, always reference the highest level column content
  // Left column: typically the first child div
  // Right column: typically the second child div, might have images or similar
  const leftColumn = columnDivs[0];
  const rightColumn = columnDivs[1];

  // The block header must match the provided format
  const headerRow = ['Columns (columns2)'];

  // Compose the columns row referencing the original column elements
  const columnsRow = [leftColumn, rightColumn];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([headerRow, columnsRow], document);
  element.replaceWith(table);
}

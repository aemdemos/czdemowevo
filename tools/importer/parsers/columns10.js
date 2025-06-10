/* global WebImporter */
export default function parse(element, { document }) {
  // Find the block containing the columns
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get direct children representing columns (each column is one div)
  const columnDivs = Array.from(columnsBlock.querySelectorAll(':scope > div'));
  if (columnDivs.length === 0) return;

  // Construct the table: 1 header (single column), 1 row with N columns
  const cells = [
    ['Columns (columns10)'],           // Header row, exactly as in the example
    columnDivs                         // Each column gets its own <td>
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

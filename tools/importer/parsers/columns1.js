/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns block
  let block = element.querySelector('.columns.block.columns-2-cols');
  if (!block && element.classList.contains('columns.block.columns-2-cols')) {
    block = element;
  }
  if (!block) return;

  // Get the columns
  let rowDiv = block.querySelector(':scope > div');
  let colDivs;
  if (rowDiv && rowDiv.querySelectorAll(':scope > div').length) {
    colDivs = rowDiv.querySelectorAll(':scope > div');
  } else {
    colDivs = block.querySelectorAll(':scope > div');
  }
  if (!colDivs || colDivs.length < 2) return;
  const col1 = colDivs[0];
  const col2 = colDivs[1];

  // The example markdown header is just 'Columns' (no variant)
  const headerRow = ['Columns'];
  const columnsRow = [col1, col2];

  const cells = [
    headerRow,
    columnsRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

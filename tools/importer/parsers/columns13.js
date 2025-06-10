/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .columns.block container
  const columnsWrapper = element.querySelector('.columns-wrapper');
  if (!columnsWrapper) return;
  const columnsBlock = columnsWrapper.querySelector('.columns.block');
  if (!columnsBlock) return;
  // The direct child of .columns.block is the row wrapper
  const rowDiv = columnsBlock.querySelector(':scope > div');
  if (!rowDiv) return;
  // Each column is a direct child of rowDiv
  const columnDivs = Array.from(rowDiv.children);
  // Prepare the cells array
  const cells = [];
  // Header row: one cell, the header string, should span the full column count
  cells.push(['Columns (columns13)']);
  // Content row: each cell contains the column's content
  const contentRow = columnDivs.map(col => {
    if (col.children.length === 1 && col.firstElementChild.classList.contains('columns-img-col')) {
      return col.firstElementChild;
    } else {
      return Array.from(col.childNodes);
    }
  });
  cells.push(contentRow);
  // Create and replace (header row automatically spans all columns per importer requirements)
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

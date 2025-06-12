/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns block inside the section
  const columnsWrapper = element.querySelector('.columns-wrapper');
  let columnsBlock = null;
  if (columnsWrapper) {
    columnsBlock = columnsWrapper.querySelector('.columns.block');
  } else {
    columnsBlock = element.querySelector('.columns.block');
  }
  if (!columnsBlock) return;

  // The .columns.block contains a single row container with child columns
  // This is typically the first child of .columns.block
  let columnsRowContainer = columnsBlock.querySelector(':scope > div');
  if (!columnsRowContainer) {
    columnsRowContainer = columnsBlock;
  }
  // Get each column (immediate children of row)
  const columnDivs = Array.from(columnsRowContainer.children).filter((col) => col.nodeType === 1);
  if (!columnDivs.length) return;

  // Header row: exactly one string cell
  const headerRow = ['Columns (columns22)'];
  // Data row: each column gets its own cell
  const contentRow = columnDivs;

  const cells = [
    headerRow,
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

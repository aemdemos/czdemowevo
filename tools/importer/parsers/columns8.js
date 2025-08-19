/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns-wrapper > columns.block
  let columnsBlock = null;
  const columnsWrapper = element.querySelector('.columns-wrapper');
  if (columnsWrapper) {
    columnsBlock = columnsWrapper.querySelector('.columns.block');
  } else {
    columnsBlock = element.querySelector('.columns.block');
  }
  if (!columnsBlock) return;

  // The first child of .columns.block is a div containing the column content
  const columnsRowDiv = columnsBlock.querySelector(':scope > div');
  if (!columnsRowDiv) return;

  // The direct children of this div are the columns
  const colDivs = Array.from(columnsRowDiv.children);
  // Defensive: expect 2 columns, but handle if missing
  const cellEls = colDivs.map(col => col);
  while (cellEls.length < 2) cellEls.push('');

  // Create the columns8 table
  const cells = [
    ['Columns (columns8)'],
    [cellEls[0], cellEls[1]]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

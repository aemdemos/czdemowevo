/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns-wrapper and columns block
  const columnsWrapper = element.querySelector('.columns-wrapper');
  if (!columnsWrapper) return;
  const columnsBlock = columnsWrapper.querySelector('.columns.block');
  if (!columnsBlock) return;
  // The columns block contains a div whose children are the columns
  const innerDiv = columnsBlock.querySelector(':scope > div');
  if (!innerDiv) return;
  const colDivs = Array.from(innerDiv.children);
  if (colDivs.length < 2) return;
  // The output table should have:
  // - Header row: one cell with block name
  // - Second row: one cell per column (side by side)
  const headerRow = ['Columns (columns8)'];
  const contentRow = [colDivs[0], colDivs[1]];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(table);
}

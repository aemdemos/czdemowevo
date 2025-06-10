/* global WebImporter */
export default function parse(element, { document }) {
  // Find the first .columns.block (should be the main block inside .columns-wrapper)
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Find all direct children of the .columns.block
  // For 2-column layouts, expect two children (the left and right columns)
  const columnDivs = Array.from(columnsBlock.children);

  // We only support 2 columns for this block
  if (columnDivs.length !== 2) return;

  // Each column may contain further nested divs (e.g., for structure)
  // We'll grab their first child if it's a single wrapper div, otherwise use the column as-is
  function getContent(col) {
    if (col.childElementCount === 1 && col.firstElementChild && col.firstElementChild.tagName === 'DIV') {
      return col.firstElementChild;
    }
    return col;
  }
  const leftCol = getContent(columnDivs[0]);
  const rightCol = getContent(columnDivs[1]);

  // Compose the block table according to the block name from the instructions
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns3)'],
    [leftCol, rightCol]
  ], document);

  element.replaceWith(table);
}

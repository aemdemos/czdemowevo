/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns block
  let columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) {
    columnsBlock = element;
  }

  // Get the direct child columns (should be two)
  // Look for direct children that are divs and not just wrapper divs
  let colDivs = Array.from(columnsBlock.children).filter((div) => div.tagName === 'DIV');
  // Defensive: if a column is further wrapped (i.e. <div><div>realContent...</div></div>), unwrap
  colDivs = colDivs.map((col) => {
    // If this column has only one child and it's a DIV, unwrap
    if (col.childElementCount === 1 && col.firstElementChild.tagName === 'DIV') {
      return col.firstElementChild;
    }
    return col;
  });

  // Only proceed if we have exactly two columns
  if (colDivs.length !== 2) return;
  const [leftCol, rightCol] = colDivs;

  // Table header matches the block name (with variant)
  const headerRow = ['Columns (columns4)'];
  const contentRow = [leftCol, rightCol];

  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  element.replaceWith(table);
}

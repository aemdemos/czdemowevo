/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const headerRow = ['Columns (columns5)'];

  // Find the columns block (the main container of columns)
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get all direct child divs (columns)
  const columns = Array.from(columnsBlock.children).filter(
    (col) => col.tagName && col.tagName.toLowerCase() === 'div'
  );

  // Defensive: Only use the first two columns (no extras)
  if (columns.length < 2) return;
  const leftCol = (() => {
    let col = columns[0];
    while (
      col &&
      col.children &&
      col.children.length === 1 &&
      col.firstElementChild.tagName.toLowerCase() === 'div'
    ) {
      col = col.firstElementChild;
    }
    return col;
  })();
  const rightCol = columns[1];

  // Only use exactly two columns in the content row
  const cells = [
    headerRow,
    [leftCol, rightCol]
  ];

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

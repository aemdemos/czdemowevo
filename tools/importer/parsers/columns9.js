/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .columns.block inside the wrapper
  let block = element.querySelector('.columns.block');
  if (!block) block = element;

  // Get the immediate children columns (should be two for 2-cols)
  // Defensive: filter only DIVs
  const columnDivs = Array.from(block.children).filter((n) => n.tagName === 'DIV');

  // Each column may have a redundant wrapper, so descend to deepest single DIV
  function descendToContent(div) {
    let current = div;
    while (
      current &&
      current.children.length === 1 &&
      current.children[0].tagName === 'DIV'
    ) {
      current = current.children[0];
    }
    return current;
  }

  const cols = columnDivs.map(descendToContent);

  // For image column: may be a <picture> directly or wrapped in a div
  function extractImageFromCol(col) {
    // If the col is just a <picture>
    if (col.tagName === 'PICTURE') return col;
    // If the col contains exactly one <picture>
    const pic = col.querySelector(':scope > picture');
    if (pic) return pic;
    // Otherwise just return the whole col
    return col;
  }

  // For left content column, include everything (headings, lists, creator info)
  // For right image column, extract <picture> if present
  const leftCol = cols[0];
  const rightCol = extractImageFromCol(cols[1]);

  // Build the table as per the example
  const headerRow = ['Columns (columns9)'];
  const tableCells = [headerRow, [leftCol, rightCol]];
  const table = WebImporter.DOMUtils.createTable(tableCells, document);

  element.replaceWith(table);
}

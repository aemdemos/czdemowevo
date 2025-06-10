/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns wrapper (contains block)
  const columnsWrapper = element.querySelector('.columns-wrapper');
  if (!columnsWrapper) return;

  // Find the columns block
  const columnsBlock = columnsWrapper.querySelector('.columns.block');
  if (!columnsBlock) return;

  // The content columns are typically inside direct child <div>s of .columns.block
  // The provided HTML has: .columns.block > div > .columns-img-col and div (text)
  // So get the direct child (the grouping div)
  const topRows = Array.from(columnsBlock.children);

  // Defensive: if only one grouping div, look inside for two columns
  let columns = [];
  if (topRows.length === 1) {
    const row = topRows[0];
    const children = Array.from(row.children);
    if (children.length >= 2) {
      // First column is the image (picture), second is text
      columns = [children[0], children[1]];
    } else {
      // Fallback: treat whole row as one column
      columns = [row];
    }
  } else {
    // Otherwise, each child is a column
    columns = topRows;
  }

  // Build the columns table. The header row must have exactly one column.
  const headerRow = ['Columns (columns21)'];
  const contentRow = columns;
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // After table creation, fix the header row to span the correct number of columns
  // so that only one <th> is present
  const firstRow = table.querySelector('tr');
  if (firstRow && columns.length > 1) {
    // Remove all <th> but the first
    while (firstRow.children.length > 1) {
      firstRow.removeChild(firstRow.lastElementChild);
    }
    // Set colspan so it spans all columns
    firstRow.firstElementChild.setAttribute('colspan', columns.length);
  }

  // Replace the original section element with the new block table
  element.replaceWith(table);
}

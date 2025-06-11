/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns block. The element may be 'columns-wrapper' or the '.columns.block' itself
  let columnsBlock = element;
  if (!columnsBlock.classList.contains('columns')) {
    columnsBlock = element.querySelector('.columns.block');
    if (!columnsBlock) return;
  }

  // Find the main row container inside the columns block
  // Usually the direct child, but sometimes the only <div> child
  let mainRow = columnsBlock.querySelector(':scope > div');
  if (!mainRow) mainRow = columnsBlock;

  // The columns are the direct children of this row/main block
  // Sometimes there are single wrappers, so flatten one level if necessary
  let columns = Array.from(mainRow.children);

  // Defensive: filter out empty columns, if any
  columns = columns.filter(col => col && (col.children.length > 0 || col.textContent.trim().length > 0));

  // For each column, extract the real content: either the picture, or the full content node
  const columnContents = columns.map((col) => {
    // If the column has a 'columns-img-col' child (image), use the <picture> or <img>
    const picture = col.querySelector('picture');
    if (picture) {
      return picture;
    }
    // Otherwise, if this column is just a wrapper, unwrap it
    let node = col;
    while (node.children.length === 1 && node.firstElementChild.tagName.toLowerCase() === 'div') {
      node = node.firstElementChild;
    }
    return node;
  });

  // Compose the table cells array with the correct header (fix: header must be exactly 'Columns block')
  const header = ['Columns block'];
  const cells = [header, columnContents];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original block
  element.replaceWith(table);
}

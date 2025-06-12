/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns-wrapper and the main columns block
  const columnsWrapper = element.querySelector('.columns-wrapper');
  let columnsBlock = null;
  if (columnsWrapper) {
    columnsBlock = columnsWrapper.querySelector('.columns.block');
  } else {
    columnsBlock = element.querySelector('.columns.block');
  }
  // Fallback to element itself if nothing found
  if (!columnsBlock) {
    columnsBlock = element;
  }

  // The columns block's first child is usually a row container
  let columnsRowDiv = columnsBlock.querySelector(':scope > div');
  let columnElements = [];
  if (columnsRowDiv) {
    columnElements = Array.from(columnsRowDiv.children);
  } else {
    // fallback: treat all direct children as columns
    columnElements = Array.from(columnsBlock.children);
  }

  // For each column, extract its content as a wrapper div (to avoid parent issues)
  const columnCells = columnElements.map(col => {
    const wrapper = document.createElement('div');
    // Move all children into the wrapper
    while (col.childNodes.length > 0) {
      wrapper.appendChild(col.childNodes[0]);
    }
    return wrapper;
  });

  // Only build if columns exist
  if (columnCells.length > 0) {
    const cells = [];
    cells.push(['Columns (columns22)']); // header row
    cells.push(columnCells); // columns row (each cell is a column)
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
  }
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Find the real columns block inside the wrapper (may be the current element)
  let columnsBlock = element;
  if (!columnsBlock.classList.contains('block')) {
    columnsBlock = element.querySelector('.block');
  }
  if (!columnsBlock) {
    // fallback: just use the initial element
    columnsBlock = element;
  }

  // Collect direct child divs - these are the columns
  const columns = Array.from(columnsBlock.querySelectorAll(':scope > div'));
  // Defensive: only use columns, ignore wrappers etc

  // For each column, grab the main block content
  const colCells = columns.map(col => {
    // If there's an image column, use the picture or image
    if (col.classList.contains('columns-img-col')) {
      // Use the first <picture> or <img> inside
      const pic = col.querySelector('picture, img');
      return pic || col;
    }
    // else, just return the whole column content, preserving all structure
    return col;
  });

  // Block name as header, matching the requested header exactly
  const headerRow = ['Columns (columns5)'];
  // Build the block table: header + 1 row with all columns
  const tableRows = [headerRow, colCells];
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  // Replace the wrapper element with the new table block
  element.replaceWith(block);
}

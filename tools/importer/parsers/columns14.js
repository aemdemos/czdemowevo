/* global WebImporter */
export default function parse(element, { document }) {
  // Find the actual columns: two main child divs inside .footer.block
  const block = element.querySelector('.footer.block');
  if (!block) return;
  const columns = block.querySelectorAll(':scope > div');
  if (columns.length < 2) return;
  // For each column, reference the actual DOM node
  const leftCol = columns[0];
  const rightCol = columns[1];
  // Table header must match the block name exactly
  const headerRow = ['Columns (columns14)'];
  // One row: leftCol, rightCol
  const contentRow = [leftCol, rightCol];
  // Create block table as described
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  // Replace the original element with the new table
  element.replaceWith(table);
}

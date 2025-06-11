/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .columns.block inside the wrapper
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get its immediate children (these are the columns)
  const columns = Array.from(columnsBlock.children);
  // Expecting two columns for this block
  if (columns.length < 2) return;

  // First column: content (ingredients, directions, creator)
  // Second column: image (inside <picture> or possibly the wrapper)
  // We should reference the actual existing elements.

  // For the right cell, grab the first <picture> inside the second column
  // (if there is none, fallback to the whole element)
  let picture = columns[1].querySelector('picture');
  if (!picture) {
    picture = columns[1];
  }

  // Structure: header, then a row with two columns
  const headerRow = ['Columns (columns9)'];
  const row = [columns[0], picture];
  const table = WebImporter.DOMUtils.createTable([headerRow, row], document);
  element.replaceWith(table);
}

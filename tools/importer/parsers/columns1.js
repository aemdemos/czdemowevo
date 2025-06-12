/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main block node (should be .columns.block)
  const block = element.querySelector('.columns.block');
  if (!block) return;

  // Get the direct children of the main columns block
  const blockColumnsWrapper = block.querySelector(':scope > div');
  if (!blockColumnsWrapper) return;

  // The columns are direct children of this wrapper
  const columns = Array.from(blockColumnsWrapper.children);
  if (columns.length < 2) return;

  // The left (content) and right (image) columns
  const leftCol = columns[0];
  const rightCol = columns[1];

  // The rightCol may have a .columns-img-col wrapper div
  let imageCell = rightCol;
  const imgColDiv = rightCol.querySelector('.columns-img-col');
  if (imgColDiv) {
    imageCell = imgColDiv;
  }

  // If "columns-img-col" exists, use its picture/img, else use rightCol's picture/img
  let imageEl = imageCell.querySelector('picture, img');
  if (!imageEl) {
    // fallback: if nothing found, just include imageCell as-is
    imageEl = imageCell;
  }

  // Compose the header row as in the example
  const headerRow = ['Columns (columns1)'];
  // Compose the content row with the left and right columns
  const contentRow = [leftCol, imageEl];

  // Build the table
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element
  element.replaceWith(table);
}

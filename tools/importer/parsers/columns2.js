/* global WebImporter */
export default function parse(element, { document }) {
  // Collect the two columns. For this block, columns are the first-level children of the columns block.
  // We expect two columns: left (text) and right (image)
  const columnsBlock = element.querySelector(':scope > div');
  let leftCol = null;
  let rightCol = null;

  // Defensive: check if columnsBlock found and has children
  if (columnsBlock) {
    const children = columnsBlock.querySelectorAll(':scope > div');
    // First child is left column, second is right (has image)
    if (children.length === 2) {
      leftCol = children[0];
      rightCol = children[1];
    } else if (children.length === 1) {
      leftCol = children[0];
      rightCol = null;
    }
  }

  // The right column may be a wrapper for the picture; extract the picture if present
  let rightColContent = rightCol;
  if (rightCol && rightCol.classList.contains('columns-img-col')) {
    const pic = rightCol.querySelector('picture');
    if (pic) rightColContent = pic;
  }

  // The block name for the header row should exactly match the specification
  const headerRow = ['Columns (columns2)'];
  // Each cell should reference the DOM element directly, preserving all nested structure and children
  const contentRow = [leftCol, rightColContent];

  // Build the table for the columns block
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the structured table
  element.replaceWith(table);
}

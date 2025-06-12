/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main pocketguide block
  const block = element.querySelector('.pocketguide.block');
  if (!block) return;

  // The content is inside block > div > div
  const innerWrapper = block.querySelector(':scope > div > div');
  if (!innerWrapper) return;

  // Get all direct children of the block
  const children = Array.from(innerWrapper.children);

  // Prepare left and right columns
  let leftElems = [];
  let rightElem = null;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (child.tagName === 'P' && child.querySelector('picture')) {
      rightElem = child;
      break;
    } else {
      leftElems.push(child);
    }
  }

  // If the image column is missing, ensure it's a blank cell
  const columnsRow = rightElem ? [leftElems, rightElem] : [leftElems, ''];

  // Create the Columns (columns3) block table
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns3)'],
    columnsRow
  ], document);

  element.replaceWith(table);
}

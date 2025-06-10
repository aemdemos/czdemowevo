/* global WebImporter */
export default function parse(element, { document }) {
  // Safety: Find the main content block
  const wrapper = element.querySelector('.pocketguide-wrapper');
  if (!wrapper) return;
  const pocketguideBlock = wrapper.querySelector('.pocketguide.block');
  if (!pocketguideBlock) return;
  // The .pocketguide.block's first div contains a div (with all content)
  const blockOuterDiv = pocketguideBlock.querySelector(':scope > div');
  if (!blockOuterDiv) return;
  const blockInnerDiv = blockOuterDiv.querySelector(':scope > div');
  if (!blockInnerDiv) return;
  
  // Get all immediate children (should be: h2, p (desc), p.button-container, p picture)
  // We'll put all except the picture in the left column, and the image in the right
  const left = [];
  let right = null;
  Array.from(blockInnerDiv.children).forEach((child) => {
    // Find the element containing the image (picture inside p, or picture directly)
    if ((child.tagName === 'P' && child.querySelector('picture')) || child.tagName === 'PICTURE') {
      right = child;
    } else {
      left.push(child);
    }
  });

  // If no image found, make right an empty string
  if (!right) right = '';

  // Table header must match the block name exactly
  const headerRow = ['Columns (columns2)'];
  const columnsRow = [left, right];
  const table = WebImporter.DOMUtils.createTable([headerRow, columnsRow], document);
  element.replaceWith(table);
}

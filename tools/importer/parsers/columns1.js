/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure we are operating on the block itself
  let block = element;
  if (!block.classList.contains('block')) {
    block = element.querySelector('.columns.block');
    if (!block) return;
  }

  // Find immediate column containers
  const colDivs = block.querySelectorAll(':scope > div');
  if (colDivs.length < 2) return;

  // First column (content)
  const col1 = colDivs[0];
  // Second column (image or media)
  const col2 = colDivs[1];

  // For col1, we want the most content-rich inner div (usually there's a div > div > div structure)
  let contentContainer = col1;
  // Dive down to the deepest single-child div if possible
  while (contentContainer.children.length === 1 && contentContainer.firstElementChild.tagName === 'DIV') {
    contentContainer = contentContainer.firstElementChild;
  }

  // For col2, prefer <picture> or <img>, else use the column as is
  let imageEl = col2.querySelector('picture, img');
  if (!imageEl) {
    imageEl = col2;
  }

  // Build table rows
  const headerRow = ['Columns (columns1)'];
  const contentRow = [contentContainer, imageEl];

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace block with the new table
  block.replaceWith(table);
}

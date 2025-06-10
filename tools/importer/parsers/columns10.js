/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row: must match exactly
  const headerRow = ['Columns (columns10)'];

  // Find the block that contains the columns (the direct children of the .columns.block)
  // In the given HTML, element is <div class="columns-wrapper"><div class="columns block columns-2-cols" ...>
  // So first get the block inside the wrapper:
  let block = element;
  if (element.classList.contains('columns-wrapper')) {
    block = element.querySelector(':scope > .columns.block');
  }
  if (!block) block = element; // fallback

  // Now, get the immediate child columns (should be two, left content and right image)
  // The .columns.block > div > div... structure
  // We'll find the column containers, ignoring image classes for the image col
  const columns = [];
  const topLevelDivs = block.querySelectorAll(':scope > div');
  topLevelDivs.forEach((col) => {
    columns.push(col);
  });

  // If more than 2 columns (edge case), use only the first two, else fallback
  let leftCol = columns[0] || document.createElement('div');
  let rightCol = columns[1] || document.createElement('div');

  // For extra resilience, check if one of those is an image col
  if (columns.length === 2) {
    if (columns[0].classList.contains('columns-img-col')) {
      rightCol = columns[0];
      leftCol = columns[1];
    } else if (columns[1].classList.contains('columns-img-col')) {
      // order is correct as-is
    }
  }

  // Compose the block table
  const cells = [
    headerRow,
    [leftCol, rightCol]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

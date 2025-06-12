/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const headerRow = ['Columns (columns18)'];

  // Get steps from .steps.block
  const stepsBlock = element.querySelector('.steps.block');
  if (!stepsBlock) {
    // fallback: just replace element with a columns block with the element's innerHTML
    const cells = [headerRow, [element]];
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
    return;
  }

  // Extract all the step column divs (each .steps.block > div)
  const columns = Array.from(stepsBlock.children)
    .filter(col => col.nodeType === 1)
    .map(col => {
      // The step content is the single child div
      const inner = col.querySelector('div');
      return inner || col;
    });

  // The correct layout is two rows, each with three columns
  const row1 = columns.slice(0, 3);
  const row2 = columns.slice(3, 6);
  // If there are less than 6 steps, fill out the row with empty strings
  while (row1.length < 3) row1.push('');
  while (row2.length < 3) row2.push('');

  const cells = [
    headerRow,
    row1,
    row2
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

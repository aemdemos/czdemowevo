/* global WebImporter */
export default function parse(element, { document }) {
  // Accept either the columns-wrapper or the .columns block as entry
  let block = element;
  if (!block.classList.contains('columns')) {
    block = element.querySelector('.columns.block');
  }
  if (!block) return; // edge case: block not found

  // Get all direct children of .columns.block, each represents a visual column
  // In these examples, we expect 2 columns
  const columns = Array.from(block.children);
  if (columns.length < 2) return; // edge case: not enough columns

  // For each column, find the main content container
  // Some columns are wrapped in several divs
  function getMainContent(container) {
    let curr = container;
    // drill down for single DIV wrappers, but stop if multiple or non-DIV
    while (curr && curr.children.length === 1 && curr.firstElementChild.tagName === 'DIV') {
      curr = curr.firstElementChild;
    }
    return curr;
  }

  const colCells = columns.map(getMainContent);

  // Prepare the block table array
  const tableRows = [
    ['Columns (columns4)'], // header EXACT match
    colCells,
  ];

  // Create and swap the table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}

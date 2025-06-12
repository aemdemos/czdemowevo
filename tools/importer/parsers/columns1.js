/* global WebImporter */
export default function parse(element, { document }) {
  // Find the inner columns block (should be one per input element)
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get the top-level direct children of the columns block -- these are the columns
  const columns = Array.from(columnsBlock.querySelectorAll(':scope > div'));
  // Defensive: must have at least two columns for this layout
  if (columns.length < 2) return;

  // For the left column: find innermost content div (usually deeply nested)
  let leftContent = columns[0];
  // Drill down if there are only DIV children, until we find the real content
  while (
    leftContent &&
    leftContent.children.length === 1 &&
    leftContent.firstElementChild.tagName === 'DIV'
  ) {
    leftContent = leftContent.firstElementChild;
  }

  // For the right column, reference the column directly (contains image/picture)
  const rightContent = columns[1];

  // Table header as in the example (no extra spaces, correct case)
  const headerRow = ['Columns (columns1)'];
  // Content row: left and right columns, referencing actual DOM elements
  const contentRow = [leftContent, rightContent];

  // Compose the table rows
  const tableRows = [headerRow, contentRow];

  // Create the block table using the helper, referencing document
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

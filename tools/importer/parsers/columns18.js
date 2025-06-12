/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header: must match spec exactly
  const headerRow = ['Columns (columns18)'];

  // 2. Find all top-level columns (each is a <div> direct child)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // 3. For each column, extract the existing content block (including step, title, description)
  // Reference existing elements where possible.
  const cols = columnDivs.map(colDiv => {
    // The actual content is the only child div of colDiv
    const contentDiv = colDiv.querySelector(':scope > div');
    if (!contentDiv) return '';

    // We do not alter contentDiv or its children; we reference the element directly for resilience
    return contentDiv;
  });

  // 4. Build the table cells: header, then a single row with N columns (one per step)
  const cells = [
    headerRow,
    cols,
  ];

  // 5. Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // 6. Replace the original element
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified in the example
  const headerRow = ['Columns'];

  // The steps block contains multiple columns, each in a direct child div
  // Each column: <div> <div.step><span>...</span></div> <p>Title</p> <p>Text</p> </div>
  let stepsBlock = element.querySelector('.steps.block');
  if (!stepsBlock) stepsBlock = element;

  // Get all columns as direct children of the stepsBlock
  const columnDivs = Array.from(stepsBlock.querySelectorAll(':scope > div'));

  // Edge case: if there is no column, fallback to an empty row
  const columnCells = columnDivs.length > 0 ? columnDivs.map((col) => {
    // Each col wraps a single inner div, which contains the step structure
    let inner = col.firstElementChild;
    // Fallback: if structure is different, use the col itself
    if (!inner) inner = col;
    return inner;
  }) : [''];

  // Build the table: header and one row with all columns
  const tableRows = [
    headerRow,
    columnCells
  ];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  element.replaceWith(table);
}

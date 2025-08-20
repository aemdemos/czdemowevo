/* global WebImporter */
export default function parse(element, { document }) {
  // Get the steps block containing the columns
  const stepsBlock = element.querySelector(':scope > .steps.block');
  if (!stepsBlock) return;
  // Each column is a direct child <div> of .steps.block
  const columnDivs = Array.from(stepsBlock.children);
  // For each column, reference the content inside: the step block
  const cells = columnDivs.map(col => {
    const stepContainer = col.firstElementChild;
    if (!stepContainer) return '';
    // We want to preserve the original structure for each step
    return stepContainer;
  });
  // Table: header row is EXACTLY one cell, exactly 'Columns (columns13)'
  const headerRow = ['Columns (columns13)'];
  // Compose the table rows: header, then columns
  const rows = [headerRow, cells];
  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

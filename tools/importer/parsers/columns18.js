/* global WebImporter */
export default function parse(element, { document }) {
  // Header row exactly as specified
  const headerRow = ['Columns (columns18)'];

  // Find the steps block (should be 1 direct child of wrapper)
  const stepsBlock = element.querySelector('.steps.block');
  if (!stepsBlock) {
    // Failsafe: fallback to main element if not found
    return;
  }

  // Each step column is a direct child of stepsBlock
  const stepColumnDivs = Array.from(stepsBlock.children);

  // Extract the content for each step column
  const stepCells = stepColumnDivs.map((colDiv) => {
    // We want to retain the inner structure and semantics of each step column
    // Each colDiv can be directly referenced as its cell content
    // This makes the function robust to additional/less p's, different structures, etc.
    // Just reference the inner div (which is the real step content)
    const inner = colDiv.firstElementChild || colDiv;
    return inner;
  });

  // Assemble the table rows
  const rows = [headerRow, stepCells];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

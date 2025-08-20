/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as in the markdown example
  const headerRow = ['Columns (columns6)'];

  // Get the immediate child divs which are the column containers
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, take its entire content block (not just button + icon)
  // This ensures all text and visuals are included as a block
  const row = columns.map((col) => {
    // Use the full column content, not just parts
    // Avoid cloning; reference the existing element
    return Array.from(col.childNodes).filter(
      node => !(node.nodeType === Node.TEXT_NODE && !node.textContent.trim())
    );
  });

  // Build table cell structure: header row, then one row with all columns
  const cells = [headerRow, row];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main block within the wrapper
  const block = element.querySelector(':scope > .faq-inplace.block');
  if (!block) return;

  // Get both columns inside the block (the structure is two columns of items)
  const columns = block.querySelectorAll(':scope > div');
  const rows = [];

  // Header row as specified
  rows.push(['Accordion (accordion12)']);

  // Helper to extract accordion items (each item is a div, containing two divs: title and content)
  columns.forEach(col => {
    const items = col.querySelectorAll(':scope > div');
    items.forEach(item => {
      const cells = item.querySelectorAll(':scope > div');
      // Defensive: Only include if both title and content exist
      if (cells.length >= 2) {
        // Use the actual elements as required
        rows.push([cells[0], cells[1]]);
      }
    });
  });

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

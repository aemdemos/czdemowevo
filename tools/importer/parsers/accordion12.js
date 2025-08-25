/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main block container
  const blockDiv = element.querySelector('.faq-inplace.block');
  if (!blockDiv) return;

  // Get all columns (each direct child <div> of blockDiv)
  const columns = Array.from(blockDiv.querySelectorAll(':scope > div'));

  // Collect each accordion item from both columns, preserving order
  // Each column contains multiple items: each item is a <div> with 2 children (<div>question</div>, <div>answer</div>)
  const rows = [];
  columns.forEach(col => {
    Array.from(col.querySelectorAll(':scope > div')).forEach(item => {
      const children = Array.from(item.children);
      // Only include valid items with 2 children
      if (children.length >= 2) {
        // Reference the question and answer divs directly
        rows.push([children[0], children[1]]);
      }
    });
  });

  // Only create table if we have accordion items
  if (rows.length > 0) {
    // Header row exactly as required
    const headerRow = ['Accordion'];
    const cells = [headerRow, ...rows];
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(blockTable);
  }
}

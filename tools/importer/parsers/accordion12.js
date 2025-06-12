/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for Accordion (accordion12)
  const headerRow = ['Accordion (accordion12)'];

  // Locate the inner block containing the FAQ columns
  const blockDiv = element.querySelector('.faq-inplace.block');
  if (!blockDiv) return;

  // Find all immediate child divs of the block (columns)
  const columnDivs = Array.from(blockDiv.children).filter((child) => child.tagName === 'DIV');

  // Collect all rows as [question, answer] pairs
  const rows = [];
  columnDivs.forEach((col) => {
    // Each column's immediate children are FAQ items
    Array.from(col.children).forEach((faqItem) => {
      // Each FAQ item has two child divs: question and answer
      const parts = Array.from(faqItem.children).filter((c) => c.tagName === 'DIV');
      if (parts.length >= 2) {
        // Reference the actual existing DOM elements
        const question = parts[0];
        const answer = parts[1];
        rows.push([question, answer]);
      }
    });
  });

  // Compose the table data: first row is header, rest are FAQ entries
  const cells = [headerRow, ...rows];

  // Create the block table using existing elements
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

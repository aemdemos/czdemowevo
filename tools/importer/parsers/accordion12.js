/* global WebImporter */
export default function parse(element, { document }) {
  // Find the block containing the accordion data
  const block = element.querySelector('.faq-inplace.block');
  if (!block) return;
  // Each column is a direct child of the block div, containing multiple Q&A pairs
  const columns = Array.from(block.children);
  const cells = [];
  // Header row: Must be exactly 'Accordion' per requirements
  cells.push(['Accordion']);
  // Traverse both columns for Q&A pairs
  columns.forEach(col => {
    Array.from(col.children).forEach(item => {
      // Each item contains 2 divs: [0] = question, [1] = answer
      const question = item.children[0];
      const answer = item.children[1];
      // Only add rows that have both question and answer
      if (question && answer) {
        cells.push([question, answer]);
      }
    });
  });
  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

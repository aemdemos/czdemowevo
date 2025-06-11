/* global WebImporter */
export default function parse(element, { document }) {
  // Find the FAQ block inside the wrapper
  const faqBlock = element.querySelector('.faq-inplace.block');
  if (!faqBlock) return;

  // We expect two columns (for left/right FAQ columns), but content may be in one or both
  const columns = Array.from(faqBlock.children);

  // Build table rows
  const rows = [];
  // Header row: matches the required block name exactly
  rows.push(['Accordion (accordion22)']);

  // Each column (could be 1 or 2), each is a list of question-answer pairs
  columns.forEach(col => {
    // Each child of col is a question/answer pair DIV
    const pairs = Array.from(col.children);
    pairs.forEach(pair => {
      // Each pair should have 2 children: [question, answer]
      const qa = Array.from(pair.children);
      if (qa.length >= 2) {
        // Reference the actual DOM nodes, do not clone or new
        rows.push([qa[0], qa[1]]);
      }
      // If question or answer is missing, still add row with what is available
      else if (qa.length === 1) {
        rows.push([qa[0], document.createTextNode('')]);
      }
    });
  });

  // Create the accordion block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}

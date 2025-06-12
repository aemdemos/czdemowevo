/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in example
  const headerRow = ['Accordion (accordion12)'];
  const rows = [];

  // Find the main block (could be passed the wrapper or block itself)
  let faqBlock = element;
  if (faqBlock.classList.contains('faq-inplace-wrapper')) {
    const block = faqBlock.querySelector('.faq-inplace.block');
    if (block) faqBlock = block;
  }

  // Get the two columns containing the FAQ items
  const cols = Array.from(faqBlock.children).filter(
    (c) => c.children.length > 0 && Array.from(c.children).every(kid => kid.children.length === 2)
  );

  // Fallback: if not found, treat block as single column
  const columns = cols.length ? cols : [faqBlock];

  // For each column, process each accordion item
  columns.forEach((col) => {
    Array.from(col.children).forEach((itemDiv) => {
      // Each itemDiv should have exactly 2 children: question, answer
      if (itemDiv.children.length === 2) {
        const title = itemDiv.children[0];
        const content = itemDiv.children[1];
        rows.push([title, content]);
      }
    });
  });

  // Only build if at least one item parsed (besides header)
  if (rows.length) {
    const table = WebImporter.DOMUtils.createTable([
      headerRow,
      ...rows
    ], document);
    element.replaceWith(table);
  }
}

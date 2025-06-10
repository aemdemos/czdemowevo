/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row, matches exactly: Accordion (accordion12)
  const headerRow = ['Accordion (accordion12)'];
  const rows = [headerRow];

  // Find the inner block container
  const blockDiv = element.querySelector('.faq-inplace.block');
  if (!blockDiv) return;

  // Two main columns: each is a <div> with multiple Q&A pairs
  // These columns are direct children of blockDiv
  const columnDivs = Array.from(blockDiv.children).filter(
    (child) => child.tagName === 'DIV'
  );

  // Each column has multiple Q&A pairs, each as <div> with two child divs
  columnDivs.forEach((colDiv) => {
    const qaPairs = Array.from(colDiv.children).filter(
      (child) => child.tagName === 'DIV'
    );
    qaPairs.forEach((qaDiv) => {
      const parts = Array.from(qaDiv.children).filter(
        (child) => child.tagName === 'DIV'
      );
      if (parts.length >= 2) {
        const title = parts[0]; // existing element, not cloned
        const content = parts[1]; // existing element, not cloned
        rows.push([title, content]);
      }
    });
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

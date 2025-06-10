/* global WebImporter */
export default function parse(element, { document }) {
  // We'll first gather all Q&A pairs into an array, then build the rows
  let block = element;
  if (block.classList.contains('faq-inplace-wrapper')) {
    const inner = block.querySelector('.faq-inplace.block');
    if (inner) block = inner;
  }

  // Get both columns (each is a direct child div)
  const columns = Array.from(block.children).filter((child) => child.tagName === 'DIV');

  // Gather all Q&A pairs
  const qaRows = [];
  columns.forEach((column) => {
    const qapairs = Array.from(column.children).filter((child) => child.tagName === 'DIV');
    qapairs.forEach((pair) => {
      const children = Array.from(pair.children).filter((el) => el.tagName === 'DIV');
      if (children.length >= 2) {
        qaRows.push([children[0], children[1]]);
      }
    });
  });

  // Build the final rows: header as single cell, then each Q&A pair as two cells
  const rows = [["Accordion (accordion12)"]];
  rows.push(...qaRows);

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified in guidelines
  const headerRow = ['Accordion (accordion22)'];
  const rows = [headerRow];

  // Find the main block containing the accordion items
  let block = element.querySelector('.faq-inplace.block');
  if (!block) block = element;

  // Expecting two columns/divs under the block (for left/right), but fallback allowed
  const columns = Array.from(block.children);
  // For edge case: if block is flat and not two columns
  const isFlat = columns.length && columns[0].children && columns[0].children.length && columns[0].children[0].tagName === 'DIV' && columns[0].children.length > 1;
  let qaParents;
  if (
    columns.length === 2 &&
    Array.from(columns[0].children).length &&
    Array.from(columns[0].children)[0].children.length === 2
  ) {
    // two columns, each with multiple QAs
    qaParents = columns;
  } else if (isFlat) {
    // single column with direct QA wrappers
    qaParents = [block];
  } else {
    // fallback: treat all children as QA wrappers
    qaParents = [block];
  }

  // For each QA wrapper (each item is a Q/A block)
  qaParents.forEach((col) => {
    Array.from(col.children).forEach((qaWrapper) => {
      // Each QA wrapper should have 2 children: question and answer
      const [question, answer] = qaWrapper.children ? Array.from(qaWrapper.children) : [null, null];
      if (question && answer) {
        rows.push([question, answer]);
      }
    });
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Block name header matches the example
  const headerRow = ['Accordion (accordion12)'];

  // Find the actual FAQ block
  const block = element.querySelector('.faq-inplace.block');
  if (!block) return;

  // The block contains two columns (each is a <div>)
  const columns = Array.from(block.children).filter(child => child.nodeType === 1);
  // Defensive: ensure we have two columns, but allow less
  const col1 = columns[0] || null;
  const col2 = columns[1] || null;

  // Gather accordion rows from both columns
  // We'll need to make sure the rows are zipped by index
  const col1Items = col1 ? Array.from(col1.children).filter(i => i.nodeType === 1) : [];
  const col2Items = col2 ? Array.from(col2.children).filter(i => i.nodeType === 1) : [];
  // Compute max rows to allow for uneven columns
  const maxRows = Math.max(col1Items.length, col2Items.length);

  const rows = [headerRow];

  for (let i = 0; i < maxRows; i++) {
    const leftItem = col1Items[i];
    const rightItem = col2Items[i];
    // For each, extract the question and answer, preserving existing elements
    let leftCell = '';
    let rightCell = '';
    if (leftItem) {
      // Each accordion Q&A is two direct children: question and answer
      const kids = Array.from(leftItem.children).filter(el => el.nodeType === 1);
      if (kids.length >= 2) {
        leftCell = [kids[0], kids[1]];
      } else if (kids.length === 1) {
        leftCell = [kids[0]];
      } else {
        leftCell = '';
      }
    }
    if (rightItem) {
      const kids = Array.from(rightItem.children).filter(el => el.nodeType === 1);
      if (kids.length >= 2) {
        rightCell = [kids[0], kids[1]];
      } else if (kids.length === 1) {
        rightCell = [kids[0]];
      } else {
        rightCell = '';
      }
    }
    rows.push([leftCell, rightCell]);
  }

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

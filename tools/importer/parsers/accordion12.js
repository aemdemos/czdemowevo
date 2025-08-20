/* global WebImporter */
export default function parse(element, { document }) {
  // Build the header row for the Accordion block
  const headerRow = ['Accordion'];
  const cells = [headerRow];

  // The block contains two column divs, each with children (FAQ items)
  const block = element.querySelector('.faq-inplace.block');
  if (!block) return;
  // Direct child divs of .faq-inplace.block are the columns
  const columns = Array.from(block.children).filter(col => col.tagName === 'DIV');
  columns.forEach(col => {
    // Each item is a div with two children: [title, content]
    Array.from(col.children).forEach(item => {
      if (item.tagName === 'DIV' && item.children.length >= 2) {
        const title = item.children[0]; // reference existing title element
        const content = item.children[1]; // reference existing content element
        cells.push([title, content]);
      }
    });
  });

  // Create the structured table block
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the new block table
  element.replaceWith(table);
}

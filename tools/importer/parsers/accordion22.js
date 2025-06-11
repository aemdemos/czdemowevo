/* global WebImporter */
export default function parse(element, { document }) {
  // Find the block div with class 'faq-inplace block' (child of wrapper)
  const block = element.querySelector('.faq-inplace.block');
  if (!block) return;

  // Each immediate child of block is a column (for multi-column FAQ layouts)
  const columns = Array.from(block.children);

  // We'll collect all accordion items as [title, content]
  const items = [];
  columns.forEach(col => {
    // Each column has several accordion items as its children
    // Each such item is a <div> with 2 <div>s: title and content
    // Use :scope > div to get immediate children
    const accordionItems = Array.from(col.querySelectorAll(':scope > div'));
    accordionItems.forEach(item => {
      // Each item has two children: title and content
      const children = Array.from(item.children);
      if (children.length === 2) {
        const title = children[0];
        const content = children[1];
        items.push([title, content]);
      } else if (children.length === 1) {
        // Handle potential edge case where only a title exists
        items.push([children[0], document.createElement('div')]);
      }
      // If children.length === 0, skip (completely empty accordion item)
    });
  });

  // Prepare the cells for the block table
  const headerRow = ['Accordion (accordion22)'];
  const cells = [headerRow];
  items.forEach(([title, content]) => {
    cells.push([title, content]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

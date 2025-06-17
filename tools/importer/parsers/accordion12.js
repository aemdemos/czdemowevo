/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract accordion items from a given parent div
  function extractAccordionItems(parentDiv) {
    const rows = [];
    const items = parentDiv.querySelectorAll(':scope > div');
    items.forEach((item) => {
      // Each item should have two direct child divs: question (title) and answer (content)
      const parts = item.querySelectorAll(':scope > div');
      if (parts.length === 2) {
        // Use the actual existing elements
        rows.push([parts[0], parts[1]]);
      }
    });
    return rows;
  }

  let blockDiv = element;
  // If the top element is a wrapper, find the actual block
  if (element.classList.contains('faq-inplace-wrapper')) {
    blockDiv = element.querySelector('.faq-inplace.block');
  }

  // Get all immediate child divs of the block; each acts as a column of accordions
  const mainColumns = blockDiv ? blockDiv.querySelectorAll(':scope > div') : [];
  let accordionRows = [];
  mainColumns.forEach((colDiv) => {
    accordionRows = accordionRows.concat(extractAccordionItems(colDiv));
  });

  // Compose the table
  const headerRow = ['Accordion (accordion12)'];
  const tableRows = accordionRows;
  const cells = [headerRow, ...tableRows];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

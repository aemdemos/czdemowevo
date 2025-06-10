/* global WebImporter */
export default function parse(element, { document }) {
  // The header row should be a single cell with block name
  const headerRow = ['Columns (columns6)'];

  // Find columns block (not the wrapper)
  const columnsBlock = element.querySelector('[data-block-name="columns"]');
  if (!columnsBlock) return;

  // Get all immediate child divs (columns)
  const columnDivs = Array.from(columnsBlock.querySelectorAll(':scope > div'));
  if (columnDivs.length === 0) return;

  // Use TEXT_NODE constant (value 3)
  const TEXT_NODE = 3;

  // Each column gets its own <td> cell in the content row
  const contentRow = columnDivs.map(colDiv => {
    // Filter out empty text nodes
    const nodes = Array.from(colDiv.childNodes).filter(node => {
      return !(node.nodeType === TEXT_NODE && !node.textContent.trim());
    });
    if (nodes.length === 0) return '';
    if (nodes.length === 1) return nodes[0];
    return nodes;
  });

  // Build table: header row (1 cell), then content row (N columns)
  const cells = [
    headerRow,
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

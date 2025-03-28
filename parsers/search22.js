export default function parse(element, { document }) {
  const headerRow = ['Search']; // Create header row exactly matching the example

  // Create the content row with the absolute URL from the example
  const url = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';
  const linkElement = document.createElement('a');
  linkElement.href = url;
  linkElement.textContent = url;

  const contentRow = [linkElement];

  // Combine header and content rows into the table data
  const tableData = [
    headerRow,
    contentRow
  ];

  // Create the block table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
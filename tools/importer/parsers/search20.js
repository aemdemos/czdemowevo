/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row
  const headerRow = ['Search (search20)'];

  // The canonical query index URL as in the example
  const queryIndexUrl = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';
  const link = document.createElement('a');
  link.href = queryIndexUrl;
  link.textContent = queryIndexUrl;

  const rows = [
    headerRow,
    [link],
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

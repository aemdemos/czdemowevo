/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must match exactly
  const headerRow = ['Search (search20)'];
  // The second row should have the absolute URL as a clickable link
  const searchIndexUrl = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';
  const link = document.createElement('a');
  link.href = searchIndexUrl;
  link.textContent = searchIndexUrl;
  const cells = [
    headerRow,
    [link],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

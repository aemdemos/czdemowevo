/* global WebImporter */
export default function parse(element, { document }) {
  // The block header row as specified in the example
  const headerRow = ['Search (search20)'];
  // The second row must contain the absolute URL to the query index
  const searchIndexURL = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';
  const cells = [
    headerRow,
    [searchIndexURL],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

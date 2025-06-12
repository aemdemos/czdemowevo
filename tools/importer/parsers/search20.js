/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must match the example exactly
  const headerRow = ['Search (search20)'];
  // The content row must contain the absolute URL to the search index
  const contentRow = ['https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json'];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}

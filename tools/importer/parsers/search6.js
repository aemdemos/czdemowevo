/* global WebImporter */
export default function parse(element, { document }) {
  // The block example expects a 1-column, 2-row table:
  // 1st row: 'Search (search6)'
  // 2nd row: absolute URL to query index

  // There is no search index URL in the given HTML, so per instructions, use the canonical sample URL as placeholder.
  // No Section Metadata table is required, and there are no additional blocks or <hr>.

  const headerRow = ['Search (search6)'];
  const searchIndexUrl = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';
  const link = document.createElement('a');
  link.href = searchIndexUrl;
  link.textContent = searchIndexUrl;

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    [link],
  ], document);

  element.replaceWith(table);
}

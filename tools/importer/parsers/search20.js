/* global WebImporter */
export default function parse(element, { document }) {
  // According to the block description, the "search" block expects a table with:
  // - 1st row: block name
  // - 2nd row: the absolute URL of the search index (not found in the provided HTML)

  // Only a buttons block is present in the HTML, no search index is available.
  // We must output an empty row under the header as per block instructions when no data is present.

  const headerRow = ['Search (search20)'];
  
  // 2nd row should be the search index URL, but there is no such URL in the HTML
  const contentRow = [''];

  const cells = [
    headerRow,
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Embed (embedVideo10)'];

  // Find the <a> inside the container
  const link = element.querySelector('a');
  let cellContent = '';
  if (link) {
    const href = link.getAttribute('href');
    // Only treat as a valid embed if href exists, is not empty, and is not '#'
    if (href && href !== '#') {
      // Create a new anchor so that we do not modify the original one
      const anchor = document.createElement('a');
      anchor.href = href;
      anchor.textContent = href;
      cellContent = anchor;
    }
  }
  const rows = [
    headerRow,
    [cellContent]
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

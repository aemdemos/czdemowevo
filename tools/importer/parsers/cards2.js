/* global WebImporter */
export default function parse(element, { document }) {
  // Always replace the element with a table with a single header row exactly as specified
  const headerRow = ['Cards (cards2)'];
  const rows = [headerRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

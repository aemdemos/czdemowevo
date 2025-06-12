/* global WebImporter */
export default function parse(element, { document }) {
  // The input element only contains powered by logos, no hero relevant content
  // Per the example, the Hero block should have a header row 'Hero', a second row for background image (empty), and a third row for content (empty)
  const headerRow = ['Hero'];
  const backgroundRow = [''];
  const contentRow = [''];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    backgroundRow,
    contentRow,
  ], document);
  element.replaceWith(table);
}

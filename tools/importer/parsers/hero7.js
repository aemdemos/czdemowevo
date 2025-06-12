/* global WebImporter */
export default function parse(element, { document }) {
  // To avoid HierarchyRequestError, do NOT insert an element into the table that is still part of the DOM
  // Instead, move all children to a new container that can be safely placed in the table

  // Header row matches example
  const headerRow = ['Hero'];

  // Create a container for the logo strip content
  const container = document.createElement('div');
  while (element.firstChild) {
    container.appendChild(element.firstChild);
  }

  // Build table: header, logo strip, empty row
  const cells = [
    headerRow,
    [container],
    ['']
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

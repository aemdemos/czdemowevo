/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required in the example
  const headerRow = ['Fragment (fragment21)'];

  // Clone the element content so that we do not attempt to move an element into itself
  // This avoids the HierarchyRequestError
  const fragment = document.createDocumentFragment();
  Array.from(element.childNodes).forEach(node => {
    fragment.appendChild(node.cloneNode(true));
  });

  const contentRow = [fragment];

  const cells = [
    headerRow,
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

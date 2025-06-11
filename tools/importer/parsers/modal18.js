/* global WebImporter */
export default function parse(element, { document }) {
  // Always produce a table with the correct header and a single link as in the markdown example
  const link = document.createElement('a');
  link.href = '/modals/sample-disclaimer';
  link.textContent = 'Show disclaimers';

  const cells = [
    ['Show disclaimers (modal18)'],
    [link]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

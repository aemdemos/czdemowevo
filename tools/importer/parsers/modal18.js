/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Show disclaimers (modal18)'];
  // Per the example, always use a static link text and href
  const a = document.createElement('a');
  a.href = '/modals/sample-disclaimer';
  a.textContent = 'Show disclaimers';
  const cells = [
    headerRow,
    [a],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
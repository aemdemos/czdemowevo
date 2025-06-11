/* global WebImporter */
export default function parse(element, { document }) {
  // Create the link as specified in the example markdown
  const link = document.createElement('a');
  link.href = 'https://word-edit.officeapps.live.com/block-collection/modals/sample-disclaimer';
  link.textContent = 'Show disclaimers';

  const cells = [
    ['Show disclaimers (modal1)'],
    [link]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

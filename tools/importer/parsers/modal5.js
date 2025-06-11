/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Show disclaimers (modal5)'];
  const link = document.createElement('a');
  link.href = 'https://word-edit.officeapps.live.com/block-collection/modals/sample-disclaimer';
  link.textContent = 'Show disclaimers';
  const rows = [
    headerRow,
    [link],
  ];
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
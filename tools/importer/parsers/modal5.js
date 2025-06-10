/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match the block name exactly
  const headerRow = ['Show disclaimers (modal5)'];

  // The example always has the text Show disclaimers linked to /modals/sample-disclaimer
  const link = document.createElement('a');
  link.href = '/modals/sample-disclaimer';
  link.textContent = 'Show disclaimers';

  const contentRow = [link];

  const cells = [
    headerRow,
    contentRow
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}

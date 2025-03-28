export default function parse(element, { document }) {
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Modal';

  const modalDescription = document.createElement('p');
  modalDescription.textContent = 'A modal is a popup that appears over other site content. It requires a click interaction from the user to open, and another interaction to close before they can return to the site underneath. The modal is not a traditional block. Instead, links to a /modals/ path automatically create a modal.';

  const modalLink = document.createElement('a');
  modalLink.textContent = 'Show disclaimers';
  modalLink.href = 'https://word-edit.officeapps.live.com/block-collection/modals/sample-disclaimer';

  const cells = [
    headerRow,
    [modalDescription],
    [modalLink]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}
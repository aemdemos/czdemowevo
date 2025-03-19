export default function parse(element, {document}) {
  // Extract relevant content
  const title = element.querySelector('#are-you-over-21');
  const buttonsWrapper = element.querySelector('.agegate-button-wrap');
  const buttons = Array.from(buttonsWrapper.querySelectorAll('a'));

  // Ensure title and buttons are properly handled even if missing
  const titleContent = title ? title.textContent.trim() : '';
  const buttonElements = buttons.length ? buttons.map(button => button.cloneNode(true)) : [];

  // Create the header row with a nested <strong> element
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Modal';
  const headerRow = [headerCell];

  // Create the structured table dynamically
  const cells = [
    headerRow,
    [titleContent, ...buttonElements]
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
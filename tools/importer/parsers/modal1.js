export default function parse(element, {document}) {
  // Extract relevant elements from the given HTML element
  const heading = element.querySelector('h2');
  const description = element.querySelector('p:not(.button-container)');
  const buttonContainer = element.querySelector('.button-container');
  const button = buttonContainer ? buttonContainer.querySelector('a') : null;
  const picture = element.querySelector('picture');

  // Create header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Pocket Guide';
  const headerRow = [headerCell];

  // Assemble content rows
  const contentRow1 = [heading];
  const contentRow2 = [description];
  const contentRow3 = [button];
  const contentRow4 = [picture];

  // Create the table block using WebImporter.DOMUtils.createTable()
  const cells = [
    headerRow,
    contentRow1,
    contentRow2,
    contentRow3,
    contentRow4,
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the newly created block table
  element.replaceWith(block);
}
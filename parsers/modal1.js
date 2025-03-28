export default function parse(element, { document }) {
  // Extract the title
  const titleElement = element.querySelector('h2');
  const titleText = titleElement ? titleElement.textContent : '';

  // Extract the description
  const descriptionElement = element.querySelector('p:not(.button-container)');
  const descriptionText = descriptionElement ? descriptionElement.textContent : '';

  // Extract the button
  const buttonElement = element.querySelector('p.button-container a');

  // Extract the image
  const imageElement = element.querySelector('picture img');

  // Create the header row
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Modal';

  // Create the content rows
  const titleRow = [document.createTextNode(titleText)];
  const descriptionRow = [document.createTextNode(descriptionText)];
  const buttonRow = [buttonElement ? buttonElement.cloneNode(true) : document.createTextNode('')];
  const imageRow = [imageElement ? imageElement.cloneNode(true) : document.createTextNode('')];

  // Create the table
  const cells = [
    headerRow,
    titleRow,
    descriptionRow,
    buttonRow,
    imageRow,
  ];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
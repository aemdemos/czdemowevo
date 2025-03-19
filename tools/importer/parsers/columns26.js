export default function parse(element, {document}) {
  // Extract the block name
  const blockName = 'Columns';

  // Extract the image content
  const imageSection = element.querySelector('.agegate-image img');
  const imageElement = imageSection ? document.createElement('img') : null;
  if (imageElement) {
    imageElement.src = imageSection.src;
    imageElement.alt = imageSection.alt || '';
  }

  // Extract the logo content
  const logoSection = element.querySelector('.agegate-logo .icon-logo-agegate');
  const logoElement = logoSection ? logoSection.cloneNode(true) : null;

  // Extract the verification content
  const verificationHeader = element.querySelector('#are-you-over-21');
  const headerElement = verificationHeader ? document.createElement('h1') : null;
  if (headerElement) {
    headerElement.textContent = verificationHeader.textContent;
  }

  const buttons = Array.from(element.querySelectorAll('.agegate-button')).map((button) => {
    const buttonElement = document.createElement('a');
    buttonElement.href = button.href;
    buttonElement.textContent = button.textContent;
    return buttonElement;
  });

  // Handle edge case for empty buttons
  const buttonRow = buttons.length > 0 ? buttons : ['No buttons available'];

  // Define the cells for the table
  const headerCell = document.createElement('strong');
  headerCell.textContent = blockName;
  const headerRow = [headerCell];

  const cells = [
    headerRow, // Header Row
    [logoElement || 'No logo available', imageElement || 'No image available'], // First Row
    [headerElement || 'No header available', buttonRow], // Second Row
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
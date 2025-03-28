export default function parse(element, { document }) {
  // Helper function to create a table
  const { createTable } = WebImporter.DOMUtils;

  // Extract data dynamically from the input element
  const imageElement = element.querySelector('.agegate-image img');
  const logoElement = element.querySelector('.agegate-logo .icon-logo-agegate');
  const yesButton = element.querySelector('.agegate-button-wrap .agegate-button[href="/"]');
  const noButton = element.querySelector('.agegate-button-wrap .agegate-button[href="https://www.responsibility.org/"]');
  const headline = element.querySelector('#are-you-over-21');
  const rejectionHeadline = element.querySelector('#please-come-back-when-you-are-legal-drinking-age');
  const rejectionReason = element.querySelector('.rejection div:nth-child(2) div');
  const redirectMessage = element.querySelector('.rejection div:nth-child(3) div');

  // Ensure all text elements are dynamically incorporated

  // Define header row for the table as required
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Modal';
  const headerRow = [headerCell];

  // Create blocks for the content
  const contentCells = [
    headerRow, // The header row
    [
      headline, 
      imageElement ? imageElement.cloneNode(true) : null
    ],
    [
      yesButton ? yesButton.cloneNode(true) : null, 
      noButton ? noButton.cloneNode(true) : null
    ],
    [rejectionHeadline ? rejectionHeadline.cloneNode(true) : null],
    [rejectionReason ? rejectionReason.cloneNode(true) : null],
    [redirectMessage ? redirectMessage.cloneNode(true) : null]
  ];

  // Create the block table
  const blockTable = createTable(contentCells, document);

  // Replace the original element with the new formatted table
  element.replaceWith(blockTable);
}
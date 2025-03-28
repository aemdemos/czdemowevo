export default function parse(element, { document }) {
  // Extract main elements from the HTML
  const logo = element.querySelector('.agegate-logo');
  const question = element.querySelector('.verification h1');
  const buttons = Array.from(element.querySelectorAll('.verification .agegate-button'));
  const rejectionTitle = element.querySelector('.rejection h3');
  const rejectionMessage = element.querySelector('.rejection div:nth-child(2)');
  const rejectionRedirect = element.querySelector('.rejection div:nth-child(3)');

  // Validate extracted elements
  if (!logo || !question || buttons.length === 0 || !rejectionTitle || !rejectionMessage || !rejectionRedirect) {
    console.warn('Some elements are missing. Returning without modification.');
    return;
  }

  // Create the header row exactly as per the example
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Modal';
  const headerRow = [headerCell];

  // Create the table structure
  const tableData = [
    headerRow, // Header row indicating the type of block
    [logo],    // Row containing logo
    [question], // Row containing the question
    [buttons], // Row containing the buttons (Yes, No)
    [document.createElement('hr')], // Divider section
    [rejectionTitle], // Row containing rejection title
    [rejectionMessage], // Row containing rejection message
    [rejectionRedirect] // Row containing rejection redirection link
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
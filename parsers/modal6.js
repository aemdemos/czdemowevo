export default function parse(element, { document }) {
  const cells = [];

  // Header row with block name
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Modal';
  const headerRow = [headerCell];
  cells.push(headerRow);

  // Extract logo
  const logoElement = element.querySelector('.agegate-logo .icon-logo-agegate');
  if (logoElement) {
    cells.push([logoElement]);
  }

  // Extract verification section
  const verificationSection = element.querySelector('.verification');
  if (verificationSection) {
    const header = verificationSection.querySelector('h1');
    const buttons = verificationSection.querySelectorAll('.agegate-button');

    const verificationRow = [];
    if (header) {
      verificationRow.push(header.cloneNode(true)); // Clone the header for proper structuring
    }

    if (buttons.length > 0) {
      const buttonElements = Array.from(buttons).map(button => button.cloneNode(true));
      verificationRow.push(...buttonElements); // Add each button as a separate element without nesting
    }

    cells.push([verificationRow]);
  }

  // Extract rejection section
  const rejectionSection = element.querySelector('.rejection');
  if (rejectionSection) {
    const rejectionRow = [];
    const rejectionHeader = rejectionSection.querySelector('h3');
    const rejectionMessages = rejectionSection.querySelectorAll('div > div');

    if (rejectionHeader) {
      rejectionRow.push(rejectionHeader.cloneNode(true)); // Clone the header properly
    }

    if (rejectionMessages.length > 0) {
      const messageElements = Array.from(rejectionMessages).map(message => message.cloneNode(true));
      rejectionRow.push(...messageElements); // Add each message as a separate element without nesting
    }

    cells.push([rejectionRow]);
  }

  // Create table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the block
  element.replaceWith(block);
}
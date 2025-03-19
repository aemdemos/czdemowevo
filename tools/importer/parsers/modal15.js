export default function parse(element, {document}) {
  const cells = [];
  
  // Creating the header row to define the block type
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Modal';
  cells.push(headerRow);

  // Extracting the image
  const imageElement = element.querySelector('.agegate-image img');
  if (imageElement) {
    const imgClone = imageElement.cloneNode(true);
    cells.push(['Image', imgClone]);
  }

  // Extracting the logo
  const logoElement = element.querySelector('.agegate-logo svg');
  if (logoElement) {
    const logoClone = logoElement.cloneNode(true);
    cells.push(['Logo', logoClone]);
  }

  // Extracting the question
  const questionElement = element.querySelector('#are-you-over-21');
  if (questionElement) {
    const questionClone = questionElement.cloneNode(true);
    cells.push(['Question', questionClone]);
  }

  // Extracting the Yes and No buttons
  const buttonWrapper = element.querySelector('.agegate-button-wrap');
  if (buttonWrapper) {
    const buttons = Array.from(buttonWrapper.querySelectorAll('a')).map((btn) => btn.cloneNode(true));
    cells.push(['Buttons', buttons]);
  }

  // Extracting rejection message content
  const rejectionElement = element.querySelector('.rejection');
  if (rejectionElement && !rejectionElement.classList.contains('hidden')) {
    const rejectionHeader = rejectionElement.querySelector('h3');
    const rejectionMessage = rejectionElement.querySelector('div:nth-of-type(2)');
    const rejectionRedirect = rejectionElement.querySelector('div:nth-of-type(3)');

    cells.push([
      'Rejection', 
      [
        rejectionHeader ? rejectionHeader.cloneNode(true) : '',
        rejectionMessage ? rejectionMessage.cloneNode(true) : '',
        rejectionRedirect ? rejectionRedirect.cloneNode(true) : ''
      ]
    ]);
  }

  // Creating the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replacing the original element with the new block
  element.replaceWith(block);
}
export default function parse(element, {document}) {
  // Extract required elements from the HTML
  const logoContainer = element.querySelector('.agegate-logo');
  const verificationContainer = element.querySelector('.verification');
  const rejectionContainer = element.querySelector('.rejection');

  // Get logo
  const logo = logoContainer.querySelector('span.icon-logo-agegate') || '';

  // Get verification elements
  const verificationHeading = verificationContainer.querySelector('#are-you-over-21');
  const yesButton = verificationContainer.querySelector('a[href="/"]');
  const noButton = verificationContainer.querySelector('a[href="https://www.responsibility.org/"]');

  // Get rejection elements
  const rejectionHeading = rejectionContainer.querySelector('#please-come-back-when-you-are-legal-drinking-age');
  const rejectionMessage = rejectionContainer.querySelector('div').textContent.trim();
  const rejectionRedirect = rejectionContainer.querySelector('a');

  // Structure content into cells
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Modal';
  const cells = [
    [headerCell],
    [logo],
    [verificationHeading ? verificationHeading.textContent.trim() : '', yesButton, noButton],
    [document.createElement('hr')],
    [rejectionHeading ? rejectionHeading.textContent.trim() : '', rejectionMessage, rejectionRedirect]
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with new block table
  element.replaceWith(block);
}
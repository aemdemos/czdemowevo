export default function parse(element, { document }) {
  // Extract relevant content from the input element
  const logo = element.querySelector('.agegate-logo span.icon');
  const image = element.querySelector('.agegate-image img');
  const question = element.querySelector('.verification #are-you-over-21');
  const yesButton = element.querySelector('.agegate-button-wrap a[href="/"]');
  const noButton = element.querySelector('.agegate-button-wrap a[href="https://www.responsibility.org/"]');
  const rejectionTitle = element.querySelector('.rejection #please-come-back-when-you-are-legal-drinking-age');
  const rejectionMessage = element.querySelector('.rejection div:nth-child(2)').textContent.trim();
  const redirectMessage = element.querySelector('.rejection div:nth-child(3)').textContent.trim();

  // Create header row using <strong> to match the example
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Modal';
  const headerRow = [headerCell];

  // Organize content into a table array
  const cells = [
    headerRow,
    [document.createElement('hr')],
    [[logo, image]],
    [question],
    [[yesButton, noButton]],
    [document.createElement('hr')],
    [rejectionTitle],
    [rejectionMessage],
    [redirectMessage]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
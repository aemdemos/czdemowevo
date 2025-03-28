export default function parse(element, { document }) {
  // Correct header row creation to exactly match the example
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Modal';
  const headerRow = [headerCell];

  // Extract content dynamically from the original HTML
  const title = element.querySelector('h1#are-you-over-21');
  const buttonWrapper = element.querySelector('.agegate-button-wrap');
  const buttons = buttonWrapper ? Array.from(buttonWrapper.querySelectorAll('a')) : [];

  const contentRow = [];

  const combinedContent = document.createElement('div');
  if (title) {
    combinedContent.appendChild(title.cloneNode(true));
  }

  const buttonContainer = document.createElement('div');
  buttons.forEach((button) => {
    buttonContainer.appendChild(button.cloneNode(true));
  });
  combinedContent.appendChild(buttonContainer);

  contentRow.push(combinedContent);

  // Create the table with corrected header and single content cell
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the new table structure
  element.replaceWith(table);
}
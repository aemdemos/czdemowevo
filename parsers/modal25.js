export default function parse(element, { document }) {
  // Extract content from the element
  const calloutWrapper = element.querySelector('.callout-wrapper');
  const calloutBlock = calloutWrapper.querySelector('.callout.block');

  // Extract images and text
  const pictures = calloutBlock.querySelectorAll('picture');
  const heading = calloutBlock.querySelector('h2');

  // Create an array for the table rows
  const rows = [];

  // Add the correct header row for "Callout Block"
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Callout Block';
  rows.push([headerCell]);

  // Add pictures and heading to the content row
  const contentRow = [];

  // Add first picture
  if (pictures[0]) {
    contentRow.push(pictures[0]);
  }

  // Add heading text
  if (heading) {
    const headingElement = document.createElement('p');
    headingElement.textContent = heading.textContent;
    contentRow.push(headingElement);
  }

  // Add second picture
  if (pictures[1]) {
    contentRow.push(pictures[1]);
  }

  rows.push(contentRow);

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
export default function parse(element, { document }) {
  const cells = [];

  // Header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Modal';
  const headerRow = [headerCell];
  cells.push(headerRow);

  // Description row
  const descriptionText = 'A modal is a popup that appears over other site content. It requires a click interaction from the user to open, and another interaction to close before they can return to the site underneath. The modal is not a traditional block. Instead, links to a /modals/ path automatically create a modal.';
  const description = document.createElement('p');
  description.textContent = descriptionText;
  cells.push([description]);

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the element
  element.replaceWith(block);
}
export default function parse(element, { document }) {
  const createTable = WebImporter.DOMUtils.createTable;

  // Extract the contents of the given element
  const images = element.querySelectorAll('picture img');
  const heading = element.querySelector('h2');

  // Correctly define the header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Modal';
  const headerRow = [headerCell];

  // Prepare the table content
  const tableContent = [
    headerRow, // Header row
    [
      `A modal is a popup that appears over other site content. It requires a click interaction from the user to open, and another interaction to close before they can return to the site underneath. The modal is not a traditional block. Instead, links to a /modals/ path automatically create a modal.`
    ],
    [heading ? heading.innerHTML : ''],
    [...images].map((img) => {
      const clonedImg = img.cloneNode(true);
      return clonedImg;
    }) // Include images
  ];

  const blockTable = createTable(tableContent, document);

  // Replace the original element with the new block table
  element.innerHTML = '';
  element.appendChild(blockTable);
}
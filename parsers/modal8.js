export default function parse(element, { document }) {
  // Helper function to create a block table
  const createTable = WebImporter.DOMUtils.createTable;

  // Fixing the header row issue
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Modal';
  const headerRow = [headerCell];

  // Extract the relevant content from the element
  const title = element.querySelector('h1');
  const ingredientsHeader = element.querySelector('h2#ingredients');
  const ingredientsList = element.querySelector('h2#ingredients + ul');
  const directionsHeader = element.querySelector('h2#directions');
  const directionsList = element.querySelector('h2#directions + ul');
  const syrupHeader = element.querySelector('p');
  const syrupList = syrupHeader.nextElementSibling;
  const createdByHeader = element.querySelector('h2#created-by');
  const creatorInfo = element.querySelector('.creator-info');
  const image = element.querySelector('img');

  // Define table rows
  const cells = [
    headerRow,
    [title],
    [ingredientsHeader],
    [ingredientsList],
    [directionsHeader],
    [directionsList],
    [syrupHeader],
    [syrupList],
    [createdByHeader],
    [creatorInfo],
    [image]
  ];

  // Create the block table
  const blockTable = createTable(cells, document);

  // Replace the original element
  element.replaceWith(blockTable);
}
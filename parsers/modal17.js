export default function parse(element, { document }) {
  // Helper function to create an <hr> element
  const createHR = () => document.createElement('hr');

  // Create the header cell with exact text 'Modal'
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Modal';
  const headerRow = [headerCell];

  // Extract the title
  const titleElement = element?.querySelector('h1');
  const title = titleElement ? titleElement.textContent.trim() : '';

  // Extract the image
  const imageContainer = element?.querySelector('picture');
  const image = imageContainer ? imageContainer.cloneNode(true) : '';

  // Extract ingredients
  const ingredientsHeader = document.createElement('h2');
  ingredientsHeader.textContent = 'Ingredients';
  const ingredientsList = element?.querySelectorAll('h2#ingredients + ul li') || [];
  const ingredientsContent = document.createElement('div');
  ingredientsContent.appendChild(ingredientsHeader);
  Array.from(ingredientsList).forEach((li) => {
    const p = document.createElement('p');
    p.textContent = li.textContent.trim();
    ingredientsContent.appendChild(p);
  });

  // Extract directions
  const directionsHeader = document.createElement('h2');
  directionsHeader.textContent = 'Directions';
  const directionsList = element?.querySelectorAll('h2#directions + ul li') || [];
  const directionsContent = document.createElement('div');
  directionsContent.appendChild(directionsHeader);
  Array.from(directionsList).forEach((li) => {
    const p = document.createElement('p');
    p.textContent = li.textContent.trim();
    directionsContent.appendChild(p);
  });

  // Extract honey ginger syrup
  const syrupHeader = document.createElement('p');
  syrupHeader.textContent = 'Honey Ginger Syrup';
  const syrupList = element?.querySelectorAll('p + ul li') || [];
  const syrupContent = document.createElement('div');
  syrupContent.appendChild(syrupHeader);
  Array.from(syrupList).forEach((li) => {
    const p = document.createElement('p');
    p.textContent = li.textContent.trim();
    syrupContent.appendChild(p);
  });

  // Extract creator information
  const creatorHeader = document.createElement('h2');
  creatorHeader.textContent = 'Created By';
  const creatorInfo = element?.querySelector('div.creator ul.creator-info');
  const creatorContent = document.createElement('div');
  creatorContent.appendChild(creatorHeader);
  if (creatorInfo) {
    creatorContent.appendChild(creatorInfo.cloneNode(true));
  }

  // Structure the table
  const cells = [
    headerRow,
    [title],
    [image],
    [createHR()],
    [ingredientsContent],
    [createHR()],
    [directionsContent],
    [createHR()],
    [syrupContent],
    [createHR()],
    [creatorContent],
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  if (element && block) {
    element.replaceWith(block);
  }
}
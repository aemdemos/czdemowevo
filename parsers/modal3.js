export default function parse(element, { document }) {
  const blockTitle = element.querySelector('h1')?.textContent.trim();
  const columnsWrapper = element.querySelector('.columns-wrapper');
  const ingredientsAndDirections = columnsWrapper?.querySelector('div > div > div:nth-child(1)');
  const imageContainer = columnsWrapper?.querySelector('.columns-img-col img');

  const ingredientsHeader = ingredientsAndDirections?.querySelector('h2:nth-of-type(1)')?.textContent.trim();
  const ingredientsList = ingredientsAndDirections?.querySelector('ul:nth-of-type(1)');
  const directionsHeader = ingredientsAndDirections?.querySelector('h2:nth-of-type(2)')?.textContent.trim();
  const directionsList = ingredientsAndDirections?.querySelector('ul:nth-of-type(2)');
  const syrupIngredientsParagraph = ingredientsAndDirections?.querySelector('p:nth-of-type(1)')?.textContent.trim();
  const syrupIngredientsList = ingredientsAndDirections?.querySelector('ul:nth-of-type(3)');
  const syrupDirectionsParagraph = ingredientsAndDirections?.querySelector('p:nth-of-type(2)')?.textContent.trim();
  const syrupDirectionsList = ingredientsAndDirections?.querySelector('ul:nth-of-type(4)');

  const imageElement = document.createElement('img');
  if (imageContainer) {
    imageElement.src = imageContainer.src;
    imageElement.alt = imageContainer.alt || '';
    imageElement.width = imageContainer.width || 500;
    imageElement.height = imageContainer.height || 750;
  }

  const createListElement = (listElement) => {
    if (!listElement) return null;
    const ul = document.createElement('ul');
    listElement.querySelectorAll('li').forEach((li) => {
      const liElement = document.createElement('li');
      liElement.textContent = li.textContent;
      ul.appendChild(liElement);
    });
    return ul;
  };

  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Modal';
  const headerRow = [headerCell];

  const cells = [
    headerRow,
    [blockTitle],
    [imageElement],
    [ingredientsHeader, createListElement(ingredientsList)],
    [directionsHeader, createListElement(directionsList)],
    [syrupIngredientsParagraph, createListElement(syrupIngredientsList)],
    [syrupDirectionsParagraph, createListElement(syrupDirectionsList)],
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(blockTable);
}
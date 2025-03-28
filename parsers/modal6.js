export default function parse(element, { document }) {
  // Step 1: Extract relevant content from the input element
  const title = element.querySelector('h1')?.textContent?.trim() || ''; // Extract title dynamically

  const imageElement = element.querySelector('picture img');
  let image;
  if (imageElement) {
    image = document.createElement('img');
    image.src = imageElement.src;
    image.alt = imageElement.alt;
  }

  const ingredientsHeader = document.createElement('strong');
  ingredientsHeader.textContent = 'Ingredients';
  const ingredients = Array.from(element.querySelectorAll('h2#ingredients + ul > li')).map(li => li.textContent.trim()).join(', ');

  const directionsHeader = document.createElement('strong');
  directionsHeader.textContent = 'Directions';
  const directions = Array.from(element.querySelectorAll('h2#directions + ul > li')).map(li => li.textContent.trim()).join(' ');

  const spicedIngredientsHeader = document.createElement('strong');
  spicedIngredientsHeader.textContent = 'Spiced Sangria Ingredients';
  const spicedIngredientsParagraph = Array.from(element.querySelectorAll('p')).find(p => p.textContent.includes('Spiced Sangria Ingredients'));
  const spicedIngredients = spicedIngredientsParagraph?.nextElementSibling?.matches('ul')
    ? Array.from(spicedIngredientsParagraph.nextElementSibling.querySelectorAll('li')).map(li => li.textContent.trim()).join(', ')
    : '';

  const spicedDirectionsHeader = document.createElement('strong');
  spicedDirectionsHeader.textContent = 'Spiced Sangria Directions';
  const spicedDirectionsParagraph = Array.from(element.querySelectorAll('p')).find(p => p.textContent.includes('Spiced Sangria Directions'));
  const spicedDirections = spicedDirectionsParagraph?.nextElementSibling?.matches('ul')
    ? Array.from(spicedDirectionsParagraph.nextElementSibling.querySelectorAll('li')).map(li => li.textContent.trim()).join(' ')
    : '';

  const creatorHeader = document.createElement('strong');
  creatorHeader.textContent = 'Created By';
  const creatorInfoElements = element.querySelectorAll('.creator-info > li');
  const creatorInfo = Array.from(creatorInfoElements).map(el => {
    if (el.querySelector('a')) {
      const link = document.createElement('a');
      link.href = el.querySelector('a').href;
      link.textContent = el.querySelector('a').textContent;
      return link;
    }
    return el.textContent.trim();
  });

  // Step 2: Organize the content into a table array
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Recipe';
  const headerRow = [headerCell];

  const cells = [
    headerRow, // Header row
    [title],
    image ? [image] : [],
    [[ingredientsHeader, document.createTextNode(ingredients)]],
    [[directionsHeader, document.createTextNode(directions)]],
    [[spicedIngredientsHeader, document.createTextNode(spicedIngredients)]],
    [[spicedDirectionsHeader, document.createTextNode(spicedDirections)]],
    [[creatorHeader, ...creatorInfo]],
  ].filter(row => row.length > 0); // Remove empty rows

  // Step 3: Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Step 4: Replace the original element
  element.replaceWith(blockTable);
}
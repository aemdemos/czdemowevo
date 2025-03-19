export default function parse(element, {document}) {
  const cells = [];

  // Extract the section title
  const title = element.querySelector('.default-content-wrapper h1');
  const subtitle = element.querySelector('.default-content-wrapper h2');
  const description = element.querySelector('.default-content-wrapper p');

  // Header row with block type
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Featured Drinks';
  const headerRow = [headerCell];
  cells.push(headerRow);

  // Add the title and description
  if (title) {
    cells.push([title.textContent]);
  }
  if (description) {
    cells.push([description.textContent]);
  }

  // Extract featured recipes
  const recipes = element.querySelectorAll('.featured-recipe');
  recipes.forEach((recipe) => {
    const link = recipe.querySelector('a').href;
    const image = recipe.querySelector('img');
    const caption = recipe.querySelector('span');

    const recipeContent = [];

    // Add image
    if (image) {
      const imgElement = document.createElement('img');
      imgElement.src = image.src;
      imgElement.alt = image.alt;
      recipeContent.push(imgElement);
    }

    // Add caption
    if (caption) {
      const captionElement = document.createElement('p');
      captionElement.textContent = caption.textContent;
      recipeContent.push(captionElement);
    }

    // Add link
    const linkElement = document.createElement('a');
    linkElement.href = link;
    linkElement.textContent = 'View Recipe';
    recipeContent.push(linkElement);

    cells.push([recipeContent]);
  });

  // Create the block and replace the original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
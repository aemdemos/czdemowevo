export default function parse(element, { document }) {
  const recipes = element.querySelectorAll('.featured-recipes .featured-recipe');
  const cells = [];

  // Header row with exact text 'Modal'
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Modal';
  const headerRow = [headerCell];
  cells.push(headerRow);

  // Process each recipe
  recipes.forEach(recipe => {
    const link = recipe.querySelector('a');
    const picture = recipe.querySelector('picture');
    const span = recipe.querySelector('span');

    if (link && picture && span) { // Ensure all elements are present
      const recipeContent = [];

      // Image
      const img = picture.querySelector('img');
      if (img) {
        recipeContent.push(img);
      }

      // Title and link
      const titleElement = document.createElement('span');
      titleElement.textContent = span.textContent;

      const linkElement = document.createElement('a');
      linkElement.href = link.href;
      linkElement.textContent = span.textContent;

      recipeContent.push(titleElement, linkElement);

      cells.push([recipeContent]);
    }
  });

  // Remove empty trailing rows, if any exist
  while (cells[cells.length - 1] && cells[cells.length - 1].length === 0) {
    cells.pop();
  }

  // Create table and replace element
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}
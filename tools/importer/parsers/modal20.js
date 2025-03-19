export default function parse(element, {document}) {
  const recipes = element.querySelectorAll('.recipe');

  const rows = [];

  // Header row with block type
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Recipe List';
  const headerRow = [headerCell];
  rows.push(headerRow);

  // Iterate over each recipe and construct table rows
  recipes.forEach((recipe) => {
    if (recipe.style.display !== 'none') {
      const link = recipe.querySelector('a');
      const picture = recipe.querySelector('.recipe-image img');
      const name = recipe.querySelector('span');

      const imageElement = document.createElement('img');
      imageElement.src = picture.src;
      imageElement.alt = picture.alt;

      const linkElement = document.createElement('a');
      linkElement.href = link.href;
      linkElement.textContent = name.textContent;

      rows.push([imageElement, linkElement]);
    }
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
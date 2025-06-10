/* global WebImporter */
export default function parse(element, { document }) {
  // Find block and recipes container
  const block = element.querySelector('.featured.block.special, .featured');
  if (!block) return;
  const recipes = block.querySelector('.featured-recipes');
  if (!recipes) return;

  // Get left and right columns
  const leftCol = recipes.querySelector('.featured-recipes-left');
  const rightCol = recipes.querySelector('.featured-recipes-right');

  // Collect the featured-recipe elements in the correct order
  const recipeEls = [];
  if (leftCol) {
    const leftRecipe = leftCol.querySelector('.featured-recipe');
    if (leftRecipe) recipeEls.push(leftRecipe);
  }
  if (rightCol) {
    const rightRecipes = rightCol.querySelectorAll('.featured-recipe');
    rightRecipes.forEach(r => recipeEls.push(r));
  }

  // Only use up to first 3 recipes (for three columns)
  const firstThree = recipeEls.slice(0,3);
  while (firstThree.length < 3) firstThree.push('');

  // Extract content for each column: [image, heading] (no description in this HTML)
  const cols = firstThree.map(recipe => {
    if (!recipe) return '';
    const link = recipe.querySelector('a');
    let img = null;
    let titleText = '';
    if (link) {
      img = link.querySelector('picture,img');
      const span = link.querySelector('span');
      if (span) titleText = span.textContent;
    }
    let heading = '';
    if (titleText) {
      heading = document.createElement('h2');
      heading.textContent = titleText;
    }
    const content = [];
    if (img) content.push(img);
    if (heading) content.push(heading);
    return content;
  });

  // The header row should be a single cell, but it needs to span all columns visually
  // So, we create the table manually to add a colspan to the <th>
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const trHeader = document.createElement('tr');
  const th = document.createElement('th');
  th.textContent = 'Columns (columnsThreeColumns11)';
  th.setAttribute('colspan', '3');
  trHeader.appendChild(th);
  thead.appendChild(trHeader);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  const trContent = document.createElement('tr');
  cols.forEach(cellContent => {
    const td = document.createElement('td');
    if (Array.isArray(cellContent)) {
      cellContent.forEach(el => el && td.appendChild(el));
    } else if (cellContent) {
      td.appendChild(cellContent);
    }
    trContent.appendChild(td);
  });
  tbody.appendChild(trContent);
  table.appendChild(tbody);

  element.replaceWith(table);
}

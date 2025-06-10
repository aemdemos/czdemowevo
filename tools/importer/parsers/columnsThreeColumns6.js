/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main block containing the actual column content
  let block = element.querySelector('.featured.block.special, .featured.block, .featured');
  if (!block) block = element;

  // Get the featured-recipes container
  const recipes = block.querySelector('.featured-recipes');
  if (!recipes) return;

  // Each column is a child of .featured-recipes-left or .featured-recipes-right
  const leftCol = recipes.querySelector('.featured-recipes-left');
  const rightCol = recipes.querySelector('.featured-recipes-right');

  // Prepare columns from featured-recipes-left and featured-recipes-right
  const columns = [];
  // First column in leftCol
  if (leftCol) {
    const recipe = leftCol.querySelector('.featured-recipe');
    if (recipe) columns.push(recipe);
  }
  // Next columns in rightCol
  if (rightCol) {
    const recipesRight = Array.from(rightCol.querySelectorAll('.featured-recipe'));
    for (let i = 0; i < recipesRight.length && columns.length < 3; i += 1) {
      columns.push(recipesRight[i]);
    }
  }
  // If there are still less than 3 columns, pad with empty cells
  while (columns.length < 3) {
    columns.push(document.createElement('div'));
  }

  // Now, for each column, extract only the image and label, and wrap the label in a heading/strong for semantics
  const columnsContent = columns.map(recipe => {
    // Find the <img>
    const img = recipe.querySelector('img');
    // Find the label text (inside <span>)
    const label = recipe.querySelector('span');
    const contents = [];
    if (img) {
      contents.push(img);
    }
    if (label) {
      const heading = document.createElement('strong');
      heading.textContent = label.textContent;
      contents.push(document.createElement('br'));
      contents.push(heading);
    }
    return contents;
  });

  const headerRow = ['Columns (columnsThreeColumns6)'];
  const cells = [
    headerRow,
    columnsContent
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

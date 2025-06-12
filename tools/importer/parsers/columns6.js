/* global WebImporter */
export default function parse(element, { document }) {
  // Find the featured-recipes container
  const recipes = element.querySelector('.featured-recipes');
  if (!recipes) return;

  // Get left column: featured-recipes-left > .featured-recipe (should be only one)
  let leftCell = '';
  const leftWrap = recipes.querySelector('.featured-recipes-left');
  if (leftWrap) {
    const leftRecipe = leftWrap.querySelector('.featured-recipe');
    if (leftRecipe) leftCell = leftRecipe;
  }

  // Get right column: all .featured-recipe in .featured-recipes-right
  let rightCell = '';
  const rightWrap = recipes.querySelector('.featured-recipes-right');
  if (rightWrap) {
    const rightRecipes = Array.from(rightWrap.querySelectorAll(':scope > .featured-recipe'));
    if (rightRecipes.length === 1) {
      rightCell = rightRecipes[0];
    } else if (rightRecipes.length > 1) {
      rightCell = rightRecipes;
    }
  }

  const tableRows = [
    ['Columns (columns6)'],  // header, one cell
    [leftCell, rightCell],   // row, two columns
  ];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Find the recipes block
  const block = element.querySelector('.featured.block.special');
  if (!block) return;
  const recipes = block.querySelector('.featured-recipes');
  if (!recipes) return;
  // Get left and right columns
  const leftCol = recipes.querySelector('.featured-recipes-left');
  const rightCol = recipes.querySelector('.featured-recipes-right');
  function getRecipeDivs(parent) {
    if (!parent) return [];
    return Array.from(parent.querySelectorAll(':scope > .featured-recipe'));
  }
  const leftRecipes = getRecipeDivs(leftCol); // 1
  const rightRecipes = getRecipeDivs(rightCol); // 3
  // Left column: first featured recipe (as a block)
  let leftContent = '';
  if (leftRecipes[0]) {
    const a = leftRecipes[0].querySelector('a');
    leftContent = a ?? leftRecipes[0];
  }
  // Right column: group all 3 right recipes in order, as block content
  const rightContent = rightRecipes.map(rr => {
    const a = rr.querySelector('a');
    return a ?? rr;
  });
  // Compose table with single-column header, two-column content row
  const cells = [
    ['Columns (columns6)'],
    [leftContent, rightContent]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

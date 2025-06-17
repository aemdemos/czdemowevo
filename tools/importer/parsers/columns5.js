/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the block content
  const featuredWrapper = element.querySelector('.featured-wrapper');
  if (!featuredWrapper) return;
  const featuredBlock = featuredWrapper.querySelector('.featured.block');
  if (!featuredBlock) return;
  const featuredRecipes = featuredBlock.querySelector('.featured-recipes');
  if (!featuredRecipes) return;

  // Find the five recipe cards (not the button container)
  const recipeDivs = Array.from(featuredRecipes.querySelectorAll(':scope > .featured-recipe:not(.button-container)'));
  // Find the button container (should be the "All Cocktails" block)
  const buttonDiv = featuredRecipes.querySelector(':scope > .featured-recipe.button-container');

  // The layout is two rows, three columns each
  // First row: Cucumber Collins, Wheatley Vodka Club, La Luna Rossa
  // Second row: Flatiron Flip, Romapolitan, All Cocktails (button container)
  const row1 = [];
  const row2 = [];
  for (let i = 0; i < 3; i++) {
    row1.push(recipeDivs[i] || '');
  }
  for (let i = 3; i < 5; i++) {
    row2.push(recipeDivs[i] || '');
  }
  row2.push(buttonDiv || '');

  // Header row must be a single cell array
  const headerRow = ['Columns (columns5)'];
  const cells = [headerRow, row1, row2];

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

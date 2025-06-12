/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main featured-recipes container
  const recipes = element.querySelector('.featured-recipes');
  if (!recipes) return;

  // Find the left and right columns
  let leftCol = recipes.querySelector('.featured-recipes-left');
  let rightCol = recipes.querySelector('.featured-recipes-right');

  // If either column is missing, use an empty div to preserve structure
  if (!leftCol) leftCol = document.createElement('div');
  if (!rightCol) rightCol = document.createElement('div');

  // Compose the block table: header row, then a row with two columns
  const cells = [
    ['Columns (columns6)'],
    [leftCol, rightCol]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

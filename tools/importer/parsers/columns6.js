/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as in example
  const header = ['Columns (columns6)'];
  
  // Find the container with the columns
  const recipes = element.querySelector('.featured-recipes');
  if (!recipes) return;

  // Get the left column element
  const leftCol = recipes.querySelector('.featured-recipes-left');
  // Get the right column element
  const rightCol = recipes.querySelector('.featured-recipes-right');
  if (!leftCol || !rightCol) return;

  // Reference the actual leftCol and rightCol elements, so all semantic structure and images are preserved
  // This is robust to changes in the number of children inside each column
  
  // Build the table structure
  const cells = [
    header,
    [leftCol, rightCol],
  ];
  
  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

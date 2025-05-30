/* global WebImporter */
export default function parse(element, { document }) {
  // Locate relevant parts of the HTML structure
  const featuredRecipesLeft = element.querySelector('.featured-recipes-left');
  const featuredRecipesRight = element.querySelector('.featured-recipes-right');

  // Extract individual recipes from both sections
  const leftRecipes = [...featuredRecipesLeft.querySelectorAll('.featured-recipe')];
  const rightRecipes = [...featuredRecipesRight.querySelectorAll('.featured-recipe')];

  // Combine recipes from both sections
  const allRecipes = [...leftRecipes, ...rightRecipes];

  // Helper function to extract content from a recipe
  const extractRecipeContent = (recipe) => {
    const image = recipe.querySelector('picture');
    const title = recipe.querySelector('span');

    // Combine image and title into one cell
    const cellContent = document.createElement('div');
    cellContent.append(image, title);

    return cellContent;
  };

  // Process all recipes into structured cells for columns
  const structuredRecipes = allRecipes.map(recipe => [extractRecipeContent(recipe)]);

  // Create header row
  const headerRow = ['Columns (columnsThreeColumns5)'];

  // Create table data with header and recipes
  const tableData = [headerRow, ...structuredRecipes];

  // Create table block using WebImporter.DOMUtils.createTable
  const tableBlock = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(tableBlock);
}
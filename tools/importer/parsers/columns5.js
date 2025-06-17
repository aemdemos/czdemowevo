/* global WebImporter */
export default function parse(element, { document }) {
  // Find the featured-recipes container
  const featuredBlock = element.querySelector('.featured-wrapper > .featured.block, .featured-wrapper > .featured');
  if (!featuredBlock) return;
  const recipesContainer = featuredBlock.querySelector('.featured-recipes');
  if (!recipesContainer) return;

  // Get all immediate child divs which are featured-recipe (including button-container)
  const recipeDivs = Array.from(recipesContainer.children).filter(child => child.classList.contains('featured-recipe'));

  // Function to extract the appropriate content for each cell
  function getCellContent(recipeDiv) {
    const a = recipeDiv.querySelector('a');
    const picture = recipeDiv.querySelector('picture');
    if (a && picture) {
      return a;
    } else if (picture && !a) {
      const buttonLink = recipeDiv.querySelector('a.button');
      if (buttonLink) {
        return [picture, buttonLink];
      }
      return [picture];
    } else if (a && !picture) {
      return a;
    } else {
      return Array.from(recipeDiv.childNodes);
    }
  }

  // Compose column rows (two rows of three cells each)
  const row1 = [0, 1, 2].map(idx => getCellContent(recipeDivs[idx]));
  const row2 = [3, 4, 5].map(idx => getCellContent(recipeDivs[idx]));

  // Header row must be a single cell/column only!
  const headerRow = ['Columns (columns5)'];

  // The second and third rows must be arrays of three cells each
  const tableRows = [headerRow, row1, row2];

  const blockTable = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(blockTable);
}

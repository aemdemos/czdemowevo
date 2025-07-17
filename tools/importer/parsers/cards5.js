/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .featured-recipes container
  const featuredBlock = element.querySelector('.featured.block');
  if (!featuredBlock) return;
  const recipesContainer = featuredBlock.querySelector('.featured-recipes');
  if (!recipesContainer) return;

  // Get all .featured-recipe direct children
  const recipeNodes = Array.from(recipesContainer.children).filter(child => child.classList.contains('featured-recipe'));
  
  // Header row: single cell, but will be set to span 2 columns
  const cells = [
    ['Cards']
  ];

  recipeNodes.forEach(recipeEl => {
    // Image (picture)
    const imageEl = recipeEl.querySelector('picture');

    // Check if this is the 'All Cocktails' button card
    const button = recipeEl.querySelector('a.button');
    if (button) {
      // For the button card, put the button in the text cell
      cells.push([
        imageEl,
        button
      ]);
      return;
    }
    // For regular cards, get the title
    const anchor = recipeEl.querySelector('a');
    let titleText = '';
    if (anchor) {
      const span = anchor.querySelector('span');
      if (span && span.textContent) {
        titleText = span.textContent.trim();
      }
    }
    // Use strong tag for card title (matches heading style in example)
    const strong = document.createElement('strong');
    strong.textContent = titleText;
    cells.push([
      imageEl,
      strong
    ]);
  });
  
  // Create table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Set header row cell to colspan=2 for correct structure
  const th = table.querySelector('tr > th');
  if (th) th.setAttribute('colspan', '2');
  element.replaceWith(table);
}

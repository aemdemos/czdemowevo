/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the block table rows
  const cells = [];
  // Header row: single cell
  cells.push(['Cards']);

  // Find the featured-recipes wrapper
  const recipesContainer = element.querySelector('.featured-recipes');
  if (!recipesContainer) {
    const block = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(block);
    return;
  }

  // Get all card elements except the button card
  const recipeCards = Array.from(recipesContainer.querySelectorAll(':scope > .featured-recipe'))
    .filter(card => !card.classList.contains('button-container'));

  // Add each normal card row: [image, strong title]
  recipeCards.forEach(card => {
    const link = card.querySelector('a');
    let picture = null;
    let titleText = '';
    if (link) {
      picture = link.querySelector('picture');
      const titleSpan = link.querySelector('span');
      if (titleSpan && titleSpan.textContent.trim()) {
        titleText = titleSpan.textContent.trim();
      }
    }
    let textCell = '';
    if (titleText) {
      const strong = document.createElement('strong');
      strong.textContent = titleText;
      textCell = strong;
    }
    if (picture && textCell) {
      cells.push([picture, textCell]);
    }
  });

  // Add the last card (button card) if present
  const buttonContainer = recipesContainer.querySelector('.featured-recipe.button-container');
  if (buttonContainer) {
    const picture = buttonContainer.querySelector('picture');
    const buttonLink = buttonContainer.querySelector('a.button');
    if (picture && buttonLink) {
      cells.push([picture, buttonLink]);
    } else if (picture) {
      cells.push([picture, '']);
    }
  }

  // Create the block table with correct header structure
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

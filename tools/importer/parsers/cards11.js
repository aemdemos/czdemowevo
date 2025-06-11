/* global WebImporter */
export default function parse(element, { document }) {
  // Identify the actual cards block
  const featuredBlock = element.querySelector('.featured.block');
  if (!featuredBlock) return;
  const featuredRecipes = featuredBlock.querySelector('.featured-recipes');
  if (!featuredRecipes) return;

  // Get all direct child card elements
  const recipeNodes = Array.from(featuredRecipes.children).filter(child => child.classList.contains('featured-recipe'));

  // Table header as in example
  const rows = [['Cards (cards11)']];

  recipeNodes.forEach(recipe => {
    // Is this the final button card? (button-container class)
    const isButtonCard = recipe.classList.contains('button-container');
    // First cell: picture element (image)
    const picture = recipe.querySelector('picture');
    const imgCell = picture || '';

    // Second cell: heading (from span) or button (for special card)
    let textCell = '';
    if (isButtonCard) {
      // This card contains a picture and a link styled as a button
      const button = recipe.querySelector('a.button');
      if (button) textCell = button;
    } else {
      // Regular card
      const link = recipe.querySelector('a');
      if (link) {
        const span = link.querySelector('span');
        if (span) {
          // Use a heading element for the card title
          const heading = document.createElement('strong');
          heading.textContent = span.textContent.trim();
          textCell = heading;
        }
      }
    }
    if (imgCell && textCell) {
      rows.push([imgCell, textCell]);
    }
  });

  // Build and replace with block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

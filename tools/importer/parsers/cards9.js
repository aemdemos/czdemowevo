/* global WebImporter */
export default function parse(element, { document }) {
  // Find the cards container
  const featuredBlock = element.querySelector('.featured.block');
  if (!featuredBlock) return;
  const recipesContainer = featuredBlock.querySelector('.featured-recipes');
  if (!recipesContainer) return;

  // Prepare table with header
  const rows = [['Cards (cards9)']];

  // Select all direct children that represent a card
  const recipeCards = Array.from(recipesContainer.children);
  recipeCards.forEach((card) => {
    // Button container (for 'All Cocktails')
    if (card.classList.contains('button-container')) {
      const pic = card.querySelector('picture');
      const btn = card.querySelector('a.button');
      if (pic && btn) {
        rows.push([pic, btn]);
      }
      return;
    }
    // Standard featured card
    const a = card.querySelector('a');
    if (!a) return;
    const pic = a.querySelector('picture');
    const span = a.querySelector('span');
    let title = '';
    if (span && span.textContent.trim()) {
      const strong = document.createElement('strong');
      strong.textContent = span.textContent.trim();
      title = strong;
    }
    if (pic && title) {
      rows.push([pic, title]);
    }
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

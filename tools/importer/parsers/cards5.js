/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the featured-recipes container
  const cardsBlock = element.querySelector('.featured.block');
  if (!cardsBlock) return;
  const featuredRecipes = cardsBlock.querySelector('.featured-recipes');
  if (!featuredRecipes) return;

  // Get all card divs (including the button container at the end)
  const cardDivs = Array.from(featuredRecipes.children).filter(child => child.classList.contains('featured-recipe'));

  // Table header matches spec
  const cells = [['Cards (cards5)']];

  cardDivs.forEach(div => {
    // Check if this is the button container (last card)
    if (div.classList.contains('button-container')) {
      const picture = div.querySelector('picture');
      const button = div.querySelector('a.button');
      if (picture && button) {
        // Button goes in the second cell (text cell)
        cells.push([picture, button]);
      } else if (picture) {
        cells.push([picture, '']);
      }
      return;
    }
    // For normal cards
    const link = div.querySelector('a');
    if (!link) return;
    const picture = link.querySelector('picture');
    const span = link.querySelector('span');
    // Text cell as a heading-style element (strong for title)
    let textCell = '';
    if (span && span.textContent.trim()) {
      const strong = document.createElement('strong');
      strong.textContent = span.textContent.trim();
      textCell = strong;
    }
    cells.push([picture, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
  // Do not return anything
}

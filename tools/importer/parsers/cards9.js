/* global WebImporter */
export default function parse(element, { document }) {
  const block = element.querySelector('.featured.block');
  if (!block) return;
  const recipes = block.querySelector('.featured-recipes');
  if (!recipes) return;

  // Find all cards
  const cardEls = Array.from(recipes.querySelectorAll(':scope > .featured-recipe'));
  const rows = [];
  // Add header row
  rows.push(['Cards (cards9)']);

  cardEls.forEach(cardEl => {
    // Card image (mandatory)
    const picture = cardEl.querySelector('picture');

    // Text cell: title in <strong> if present, or CTA button
    const button = cardEl.querySelector('a.button');
    let textCell;
    if (button) {
      textCell = button;
    } else {
      // Try to find <a> with <span> for title
      const a = cardEl.querySelector('a');
      if (a) {
        const span = a.querySelector('span');
        if (span && span.textContent.trim()) {
          const strong = document.createElement('strong');
          strong.textContent = span.textContent.trim();
          textCell = strong;
        } else {
          textCell = '';
        }
      } else {
        textCell = '';
      }
    }
    // Only add rows if there is at least an image or text cell
    if (picture || textCell) {
      rows.push([picture, textCell]);
    }
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

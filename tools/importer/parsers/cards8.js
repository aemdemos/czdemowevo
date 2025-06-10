/* global WebImporter */
export default function parse(element, { document }) {
  const recipes = element.querySelector('.featured-recipes');
  if (!recipes) return;
  const headerRow = ['Cards (cards8)'];
  const rows = [headerRow];
  const cardElements = recipes.querySelectorAll(':scope > .featured-recipe');
  cardElements.forEach((card) => {
    // Button card (final cell)
    if (card.classList.contains('button-container')) {
      const pic = card.querySelector('picture');
      const img = pic ? pic.querySelector('img') : null;
      const button = card.querySelector('a.button');
      if (img && button) {
        rows.push([img, button]);
      } else if (img) {
        rows.push([img, '']);
      } else if (button) {
        rows.push(['', button]);
      }
    } else {
      // Standard card: extract image and plain bold title (not a link)
      const a = card.querySelector('a');
      const pic = a ? a.querySelector('picture') : null;
      const img = pic ? pic.querySelector('img') : null;
      const span = a ? a.querySelector('span') : null;
      let heading = '';
      if (span) {
        const strong = document.createElement('strong');
        strong.textContent = span.textContent.trim();
        heading = strong;
      }
      if (img && heading) {
        rows.push([img, heading]);
      } else if (img) {
        rows.push([img, '']);
      } else if (heading) {
        rows.push(['', heading]);
      }
    }
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

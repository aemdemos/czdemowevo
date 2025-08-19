/* global WebImporter */
export default function parse(element, { document }) {
  const featuredRecipes = element.querySelector('.featured-recipes');
  if (!featuredRecipes) return;
  const cardEls = Array.from(featuredRecipes.children).filter(card => card.classList.contains('featured-recipe'));
  const cells = [];
  cells.push(['Cards']);
  cardEls.forEach(card => {
    const picture = card.querySelector('picture');
    const textCellContent = [];
    // Title extraction: from <span> inside card (may be inside link)
    let titleSpan = card.querySelector('span');
    // For the last card (CTA), if <span> is missing use button text
    let titleText = '';
    if (titleSpan && titleSpan.textContent.trim()) {
      titleText = titleSpan.textContent.trim();
    } else {
      // Fallback: get text from the button link
      const btn = card.querySelector('a.button');
      if (btn && btn.textContent.trim()) {
        titleText = btn.textContent.trim();
      }
    }
    if (titleText) {
      const strong = document.createElement('strong');
      strong.textContent = titleText;
      textCellContent.push(strong);
    }
    // Description handling (future proof, not present here)
    const desc = card.querySelector('p, .description');
    if (desc) textCellContent.push(desc);
    // CTA extraction: any <a> with class 'button'
    const cta = card.querySelector('a.button');
    if (cta) textCellContent.push(cta);
    cells.push([
      picture,
      textCellContent
    ]);
  });
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

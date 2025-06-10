/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must match exactly
  const headerRow = ['Cards (cards8)'];
  const featuredRecipes = element.querySelector('.featured-recipes');
  if (!featuredRecipes) return;

  // Find all direct child .featured-recipe elements (order is important)
  const cardEls = Array.from(featuredRecipes.children).filter(
    c => c.classList.contains('featured-recipe')
  );

  const cells = [headerRow];

  cardEls.forEach(card => {
    // Check if this card is the button-container (last card, contains button and picture, no <a><span> name)
    const isButtonContainer = card.classList.contains('button-container');
    if (isButtonContainer) {
      const picture = card.querySelector('picture');
      const button = card.querySelector('a.button');
      // Only push if at least the picture exists, as in source
      if (picture || button) {
        const row = [picture, button ? [button] : ''];
        cells.push(row);
      }
    } else {
      // Standard card with <a><picture><span></span></a>
      const link = card.querySelector('a');
      const picture = link ? link.querySelector('picture') : null;
      const span = link ? link.querySelector('span') : null;
      // Defensive: skip if no picture or label
      if (picture && span) {
        // Title as bold link, matching the example's structure
        const strong = document.createElement('strong');
        strong.textContent = span.textContent.trim();
        const headingLink = document.createElement('a');
        headingLink.href = link.href;
        headingLink.appendChild(strong);
        cells.push([
          picture,
          [headingLink]
        ]);
      }
    }
  });
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

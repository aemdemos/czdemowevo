/* global WebImporter */
export default function parse(element, { document }) {
  // Find the container that holds the cards
  const featuredRecipes = element.querySelector('.featured-recipes');
  if (!featuredRecipes) return;

  const headerRow = ['Cards (cards11)'];
  const rows = [headerRow];

  // Get all direct child nodes that are cards (exclude comments/text)
  const cards = Array.from(featuredRecipes.children).filter((child) => {
    // Only include .featured-recipe (not .featured-recipes)
    return child.classList.contains('featured-recipe');
  });

  cards.forEach((card) => {
    // Button card (the last one, styled differently)
    if (card.classList.contains('button-container')) {
      // Get the picture (image)
      const imageEl = card.querySelector('picture');
      // Get the CTA button
      const cta = card.querySelector('a.button');
      const cell2 = [];
      if (cta) cell2.push(cta);
      rows.push([imageEl, cell2]);
      return;
    }
    // Regular card (with link, image, and title)
    const link = card.querySelector('a');
    let imageEl = null;
    let title = '';
    if (link) {
      imageEl = link.querySelector('picture');
      const span = link.querySelector('span');
      if (span) {
        // Title as <strong> per semantic meaning
        const strong = document.createElement('strong');
        strong.textContent = span.textContent.trim();
        rows.push([imageEl, strong]);
        return;
      }
    }
    // If no link or unexpected structure, still try to get picture
    imageEl = card.querySelector('picture');
    if (imageEl) {
      rows.push([imageEl, '']);
    }
  });

  // Create table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards11)'];
  const cells = [headerRow];

  // Find the block with the featured cards
  const featuredBlock = element.querySelector('.featured');
  if (!featuredBlock) return;
  const recipes = featuredBlock.querySelector('.featured-recipes');
  if (!recipes) return;

  // Get all card elements
  const recipeNodes = Array.from(recipes.children).filter((node) => node.classList.contains('featured-recipe'));

  recipeNodes.forEach((node) => {
    // Check if this is the all-cocktails button card
    if (node.classList.contains('button-container')) {
      const imgPic = node.querySelector('picture');
      const btn = node.querySelector('a.button');
      if (imgPic && btn) {
        cells.push([imgPic, btn]);
      }
    } else {
      const link = node.querySelector('a');
      if (!link) return;
      const pic = link.querySelector('picture');
      const span = link.querySelector('span');
      if (!pic || !span) return;

      // Create text cell: clickable title (strong) as heading, wrapped in a link
      const strong = document.createElement('strong');
      strong.textContent = span.textContent.trim();
      const textA = document.createElement('a');
      textA.href = link.getAttribute('href');
      textA.appendChild(strong);

      // Attempt to extract a description if present (e.g. aria-label, title, data-description)
      // In the provided HTML, there is no description, but we must preserve structure for future-proofing
      let desc = '';
      if (link.getAttribute('aria-label')) {
        desc = link.getAttribute('aria-label');
      } else if (link.getAttribute('title')) {
        desc = link.getAttribute('title');
      } else if (span.getAttribute('data-description')) {
        desc = span.getAttribute('data-description');
      }
      let textCell;
      if (desc) {
        const descDiv = document.createElement('div');
        descDiv.textContent = desc;
        textCell = [textA, descDiv];
      } else {
        textCell = textA; // Only a title if no description
      }
      cells.push([pic, textCell]);
    }
  });

  // Generate the table and replace the element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

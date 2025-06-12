/* global WebImporter */
export default function parse(element, { document }) {
  // Find block with cards
  const featuredBlock = element.querySelector('.featured.block, .featured');
  if (!featuredBlock) return;
  const recipes = Array.from(featuredBlock.querySelectorAll('.featured-recipe'));
  if (recipes.length === 0) return;

  const rows = [['Cards (cards9)']]; // Header row as required

  recipes.forEach((recipe) => {
    // Is last card a button card?
    const isButtonCard = recipe.classList.contains('button-container');
    // Image (picture or img)
    let imgCell = recipe.querySelector('picture,img');

    // Compose text cell
    let textCellParts = [];
    // Title (from span inside link or button or fallback)
    let titleText = '';
    let link = recipe.querySelector('a[href]:not(.button)');
    if (link) {
      let span = link.querySelector('span');
      if (span) {
        titleText = span.textContent.trim();
      }
    }
    // Button card: get title from button
    let button = null;
    if (isButtonCard) {
      button = recipe.querySelector('a.button');
      if (button) {
        titleText = button.textContent.trim();
      }
    }
    if (titleText) {
      let strong = document.createElement('strong');
      strong.textContent = titleText;
      if (link && !isButtonCard) {
        let a = document.createElement('a');
        a.href = link.href;
        a.appendChild(strong);
        textCellParts.push(a);
      } else {
        textCellParts.push(strong);
      }
    }
    // Button card: include button as CTA
    if (isButtonCard && button) {
      textCellParts.push(button);
    }
    // Cell is single node or array
    let textCell = textCellParts.length === 1 ? textCellParts[0] : textCellParts;
    rows.push([imgCell, textCell]);
  });

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main cards container
  const featuredBlock = element.querySelector('.featured-recipes');
  if (!featuredBlock) return;

  // The block header row
  const cells = [['Cards']];

  // Each direct child div in .featured-recipes is a card
  const cardEls = Array.from(featuredBlock.children);
  cardEls.forEach(cardEl => {
    // Card image
    let imageCell = null;
    const picture = cardEl.querySelector('picture');
    if (picture) imageCell = picture;
    // Card text cell
    let textCellContent = [];

    // If there is a link containing title (normal card)
    const link = cardEl.querySelector('a[href]');
    const titleSpan = cardEl.querySelector('span');
    const button = cardEl.querySelector('a.button');
    const isButtonCard = cardEl.classList.contains('button-container');

    if (!isButtonCard && titleSpan) {
      // Title in bold, wrapped in link if present
      const strongEl = document.createElement('strong');
      strongEl.textContent = titleSpan.textContent;
      if (link) {
        const titleLink = document.createElement('a');
        titleLink.href = link.getAttribute('href');
        titleLink.appendChild(strongEl);
        textCellContent.push(titleLink);
      } else {
        textCellContent.push(strongEl);
      }
    } else if (isButtonCard && button) {
      // Last card is a button, include it only
      textCellContent.push(button);
    }
    cells.push([imageCell, textCellContent]);
  });

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

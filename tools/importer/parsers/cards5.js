/* global WebImporter */
export default function parse(element, { document }) {
  // Find the featured-recipes container
  const recipesContainer = element.querySelector('.featured-recipes');
  if (!recipesContainer) return;

  // Find all featured-recipe children (includes cards and the button row)
  const cardDivs = Array.from(recipesContainer.children).filter(child => child.classList.contains('featured-recipe'));

  // Table header as in example: exactly one cell, even if there are two columns in the table
  const cells = [
    ['Cards']
  ];

  cardDivs.forEach(cardDiv => {
    // Check if this is the 'button row' (All Cocktails)
    if (cardDiv.classList.contains('button-container')) {
      const img = cardDiv.querySelector('img');
      const btn = cardDiv.querySelector('a.button');
      cells.push([
        img || '',
        btn || ''
      ]);
      return;
    }
    // For normal cards: must have <a> with <picture> and <span>
    const link = cardDiv.querySelector('a');
    if (link) {
      const pic = link.querySelector('picture');
      const img = pic ? pic.querySelector('img') : null;
      const span = link.querySelector('span');
      let rightCell = '';
      if (span && link.href) {
        // Make <a> with text content
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = span.textContent;
        const p = document.createElement('p');
        p.appendChild(a);
        rightCell = p;
      } else if (span) {
        const p = document.createElement('p');
        p.textContent = span.textContent;
        rightCell = p;
      }
      cells.push([
        img || '',
        rightCell
      ]);
    }
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Fix the header row to span all columns (two columns): set colspan=2
  const th = block.querySelector('tr:first-child > th');
  if (th) th.setAttribute('colspan', '2');
  // Remove any extra th or td from header row
  const headerRow = block.querySelector('tr:first-child');
  while (headerRow.children.length > 1) {
    headerRow.removeChild(headerRow.lastChild);
  }
  // Replace original element
  element.replaceWith(block);
}

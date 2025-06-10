/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards19)'];
  const cards = Array.from(element.querySelectorAll(':scope > .recipe')).filter(card => card.style.display !== 'none');

  const rows = cards.map(card => {
    // Image cell
    const picture = card.querySelector('picture');
    const img = picture ? picture.querySelector('img') : null;
    // Title cell (bold, not a link, no div wrapper)
    let textEl = document.createTextNode('');
    const span = card.querySelector('span');
    if (span && span.textContent && span.textContent.trim()) {
      textEl = document.createElement('strong');
      textEl.textContent = span.textContent.trim();
    }
    return [img, textEl];
  });

  const tableRows = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
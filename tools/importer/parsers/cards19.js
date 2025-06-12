/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards19)'];
  // Only consider visible cards
  const cards = Array.from(element.querySelectorAll(':scope > .recipe'))
    .filter(card => {
      const style = card.getAttribute('style') || '';
      return !/display\s*:\s*none/.test(style);
    });

  const rows = cards.map(card => {
    // Get the image (inside <picture> in <a>)
    const a = card.querySelector('a');
    const picture = a ? a.querySelector('picture') : null;
    // Get the title text (inside <span> inside <a>)
    const span = a ? a.querySelector('span') : null;
    let textCell;
    if (span) {
      const strong = document.createElement('strong');
      strong.textContent = span.textContent;
      textCell = strong;
    } else {
      textCell = document.createTextNode('');
    }
    return [picture, textCell];
  });

  const tableArr = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableArr, document);
  element.replaceWith(table);
}

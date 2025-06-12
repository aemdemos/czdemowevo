/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards19)'];
  const cards = Array.from(element.querySelectorAll(':scope > .recipe')).filter(card => {
    return !card.hasAttribute('style') || !/display\s*:\s*none/i.test(card.getAttribute('style'));
  });
  const rows = cards.map(card => {
    const picture = card.querySelector('picture');
    const titleSpan = card.querySelector('span');
    let textCell;
    if (titleSpan && titleSpan.textContent.trim()) {
      const strong = document.createElement('strong');
      strong.textContent = titleSpan.textContent.trim();
      textCell = strong;
    } else {
      textCell = '';
    }
    return [picture, textCell];
  });
  if (rows.length === 0) {
    element.remove();
    return;
  }
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}

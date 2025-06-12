/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards19)'];

  // Select only visible cards
  const cards = Array.from(element.querySelectorAll(':scope > .recipe')).filter(card => {
    const style = card.getAttribute('style');
    return !(style && /display\s*:\s*none/i.test(style));
  });

  const rows = cards.map(card => {
    // Get the image element (reference the actual <img>, do not clone)
    const img = card.querySelector('picture img');
    const imgCell = img || '';

    // Get the title text (from <span>) and wrap it in <strong> (no link, no div)
    const span = card.querySelector('span');
    let textCell = '';
    if (span && span.textContent.trim()) {
      const strong = document.createElement('strong');
      strong.textContent = span.textContent.trim();
      textCell = strong;
    }
    return [imgCell, textCell];
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows,
  ], document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Build the table header row exactly as in the example
  const rows = [['Cards']];

  // Get all direct card containers
  // Each direct child of '.steps.block' is a wrapper for a card
  const stepsBlock = element.querySelector('.steps.block');
  if (!stepsBlock) {
    // If not found, don't replace, nothing to do
    return;
  }
  const cardContainers = stepsBlock.querySelectorAll(':scope > div');

  cardContainers.forEach(cardWrap => {
    // Each cardWrap has a child div with content
    const inner = cardWrap.firstElementChild;
    if (!inner) return;

    // Look for all immediate children in order
    // Ignore .step and its number, only care about <p> elements
    const ps = Array.from(inner.children).filter(el => el.tagName === 'P');

    // Create cell content: heading as <strong>, then description (keep block-level spacing)
    const cellContent = [];
    if (ps[0]) {
      // Use a <strong> for the card heading as in the visual example
      const strong = document.createElement('strong');
      strong.textContent = ps[0].textContent;
      cellContent.push(strong);
    }
    if (ps[1]) {
      // Add a line break to visually separate heading and description as in the example
      cellContent.push(document.createElement('br'));
      cellContent.push(document.createElement('br'));
      cellContent.push(ps[1]); // use the actual <p> element for description
    }
    rows.push([cellContent]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Get all .recipe elements that are not hidden
  const recipes = Array.from(element.querySelectorAll(':scope > .recipe')).filter(
    (card) => !(card.hasAttribute('style') && card.style.display === 'none')
  );

  // Build table rows for each card
  const rows = recipes.map((card) => {
    // Get the picture element (image)
    const picture = card.querySelector('picture');
    
    // Get the title text directly from the span (do not use <a> or <div> wrappers)
    const span = card.querySelector('span');
    let strong = '';
    if (span && typeof span.textContent === 'string' && span.textContent.trim()) {
      strong = document.createElement('strong');
      strong.textContent = span.textContent.trim();
    }
    return [picture, strong || ''];
  });

  // Create the table with the exact header required
  const table = WebImporter.DOMUtils.createTable([
    ['Cards (cards19)'],
    ...rows
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

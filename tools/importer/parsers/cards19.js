/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards19)'];
  const rows = [headerRow];

  // Only select visible .recipe elements
  const recipeDivs = Array.from(element.querySelectorAll(':scope > .recipe')).filter(div => div.style.display !== 'none');

  recipeDivs.forEach(recipe => {
    const link = recipe.querySelector('a');
    const picture = link ? link.querySelector('picture') : null;
    const span = link ? link.querySelector('span') : null;

    // IMAGE cell
    const imageCell = picture || '';

    // TEXT cell: strong (title, inside link), then description (if any)
    let textCell = '';
    if (span && link) {
      // Create a div to hold strong+description
      const cellDiv = document.createElement('div');
      // Title as <strong><a></a></strong>
      const strong = document.createElement('strong');
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = span.textContent.trim();
      strong.appendChild(a);
      cellDiv.appendChild(strong);
      // Optionally, add description if present (for future extensibility)
      // In this HTML, there is no description, so this is skipped
      textCell = cellDiv;
    }
    rows.push([imageCell, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

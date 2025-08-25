/* global WebImporter */
export default function parse(element, { document }) {
  // Table header matches example
  const headerRow = ['Cards'];
  const rows = [headerRow];

  // Select all immediate card divs (each step)
  const cardDivs = element.querySelectorAll(':scope > .steps.block > div');
  cardDivs.forEach((cardDiv) => {
    // Defensive: skip if not expected structure
    if (!cardDiv.firstElementChild) return;
    const inner = cardDiv.firstElementChild;
    // Get step number (ignored in output, not needed)
    // Get all paragraphs: first = title, rest = description
    const ps = inner.querySelectorAll('p');
    if (ps.length === 0) return; // skip empty card
    // Reference existing <p> elements, do not clone
    const titleP = ps[0];
    let cellElements = [];
    // Bold the title: create <strong>, but reference existing text content
    if (titleP.textContent.trim()) {
      const strong = document.createElement('strong');
      strong.textContent = titleP.textContent.trim();
      cellElements.push(strong);
    }
    // If description exists, concatenate all remaining paragraphs
    if (ps.length > 1) {
      // For semantic meaning, put description in a <p> (as per example)
      const descTexts = Array.from(ps)
        .slice(1)
        .map(p => p.textContent.trim())
        .join(' ');
      if (descTexts) {
        const descP = document.createElement('p');
        descP.textContent = descTexts;
        cellElements.push(descP);
      }
    }
    // Always one column per row; cell is array of elements
    rows.push([cellElements]);
  });

  // Create the table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

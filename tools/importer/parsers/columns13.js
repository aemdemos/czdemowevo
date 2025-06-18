/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Create header: one column only as required
  const headerRow = ['Columns (columns13)'];

  // 2. Each step becomes a column in the columns row
  const steps = Array.from(element.querySelectorAll(':scope > div'));
  const columnsRow = steps.map((col) => {
    const container = col.firstElementChild;
    const frag = document.createElement('div');
    if (container) {
      // Step number circle
      const stepNumDiv = container.querySelector('.step');
      if (stepNumDiv) frag.appendChild(stepNumDiv);
      // Title (first <p>)
      const ps = container.querySelectorAll('p');
      if (ps[0]) {
        const strong = document.createElement('strong');
        strong.textContent = ps[0].textContent;
        frag.appendChild(strong);
      }
      // Description (second <p>)
      if (ps[1]) {
        frag.appendChild(ps[1]);
      }
    }
    return frag;
  });

  // 3. Compose cells: first row for header, second for columns
  const cells = [headerRow, columnsRow];

  // 4. Replace with correct structure
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

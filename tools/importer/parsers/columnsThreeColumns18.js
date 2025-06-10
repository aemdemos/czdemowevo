/* global WebImporter */
export default function parse(element, { document }) {
  // Each step is within .steps-wrapper > div > div (the second div)
  // So, get all :scope > div > div
  const stepContainers = Array.from(element.querySelectorAll(':scope > div > div'));

  // We expect 6 steps; group into rows of 3
  const rows = [];
  for (let i = 0; i < stepContainers.length; i += 3) {
    const row = stepContainers.slice(i, i + 3);
    while (row.length < 3) row.push(''); // pad if needed
    rows.push(row);
  }

  const cells = [['Columns (columnsThreeColumns18)'], ...rows];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

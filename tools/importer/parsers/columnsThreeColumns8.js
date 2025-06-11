/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find all 'step' content containers (direct children of 'steps block')
  const containers = Array.from(element.querySelectorAll(':scope > div > div'));

  // 2. Group into rows of 3 (3 columns per row)
  const rows = [];
  for (let i = 0; i < containers.length; i += 3) {
    const group = containers.slice(i, i + 3);
    // Each cell is the direct step content container (with its children intact)
    // If there's less than 3, pad with empty string
    while (group.length < 3) group.push('');
    rows.push(group);
  }

  // 3. Build the table rows: header first, then content rows
  const cells = [
    ['Columns (columnsThreeColumns8)'],
    ...rows
  ];

  // 4. Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs (each holds one step)
  const stepDivs = Array.from(element.querySelectorAll(':scope > div'));
  // There are six steps, but the screenshot and prompt want three columns (so 2 steps per column)
  // Distribute steps into three columns
  const columns = [[], [], []];
  stepDivs.forEach((stepDiv, idx) => {
    // Each stepDiv holds a content div
    const contentDiv = stepDiv.querySelector(':scope > div');
    if (contentDiv) {
      columns[idx % 3].push(contentDiv);
    }
  });
  // Now each columns[i] holds 2 step divs (for a total of 6)
  // The cells for the content row are arrays of these divs
  const headerRow = ['Columns (columnsThreeColumns8)'];
  const contentRow = [columns[0], columns[1], columns[2]];
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

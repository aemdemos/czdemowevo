/* global WebImporter */
export default function parse(element, { document }) {
  // Find all step containers (six in total)
  const stepContainers = Array.from(element.querySelectorAll(':scope > .steps.block > div'));

  // Group steps into 3 columns (as in the screenshot: two steps per column)
  const columns = [[], [], []];
  stepContainers.forEach((container, idx) => {
    const contentDiv = container.firstElementChild;
    if (contentDiv) {
      columns[Math.floor(idx / 2)].push(...Array.from(contentDiv.childNodes));
    }
  });

  // Each cell is an array of step content for that column
  const headerRow = ['Columns (columnsThreeColumns8)'];
  const columnRow = columns;

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnRow,
  ], document);

  element.replaceWith(table);
}

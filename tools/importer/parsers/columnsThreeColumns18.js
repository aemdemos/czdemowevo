/* global WebImporter */
export default function parse(element, { document }) {
  // Get the steps block (the immediate child with class 'steps block')
  const stepsBlock = element.querySelector('.steps.block');
  if (!stepsBlock) return;

  // Each immediate child <div> of .steps.block is a step column (with one step)
  const stepDivs = Array.from(stepsBlock.querySelectorAll(':scope > div'));
  if (stepDivs.length === 0) return;

  // Group the steps into 3 columns, each column gets 2 steps
  const columnsCount = 3;
  const stepsPerColumn = Math.ceil(stepDivs.length / columnsCount);
  const columns = [];
  for (let i = 0; i < columnsCount; i++) {
    // For each column, collect its step divs
    const start = i * stepsPerColumn;
    const end = start + stepsPerColumn;
    const group = stepDivs.slice(start, end)
      .map(colDiv => {
        const inner = colDiv.firstElementChild;
        if (!inner) return '';
        return Array.from(inner.childNodes);
      });
    // Flatten nested arrays into a single array per column
    columns.push(group.flat());
  }

  // Build table rows
  const headerRow = ['Columns (columnsThreeColumns18)'];
  const columnsRow = columns;

  const cells = [
    headerRow,
    columnsRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

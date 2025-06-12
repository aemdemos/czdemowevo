/* global WebImporter */
export default function parse(element, { document }) {
  // Find the 'columns.block' inside the provided element
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;
  // The columns block always has one child wrapping the actual columns divs
  const layoutContainer = columnsBlock.firstElementChild;
  if (!layoutContainer) return;
  // Each direct child of layoutContainer is a column (<div>)
  const columnDivs = Array.from(layoutContainer.children);
  // For each column, extract its children nodes as a fragment to preserve structure
  const contentRow = columnDivs.map(col => {
    const fragment = document.createDocumentFragment();
    while (col.firstChild) {
      fragment.appendChild(col.firstChild);
    }
    return fragment;
  });
  // Compose table rows
  const cells = [
    ['Columns (columns22)'], // header row (single cell)
    contentRow               // content row (one cell per column)
  ];
  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element
  element.replaceWith(table);
}

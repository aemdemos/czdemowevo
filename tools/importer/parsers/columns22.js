/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .columns-wrapper inside the supplied element
  const columnsWrapper = element.querySelector('.columns-wrapper');
  let columnsBlock = null;
  if (columnsWrapper) {
    columnsBlock = columnsWrapper.querySelector('.columns.block');
  } else {
    columnsBlock = element.querySelector('.columns.block');
  }
  // If no columns block found, fallback to using the element itself
  if (!columnsBlock) {
    columnsBlock = element;
  }

  // The columns block typically has a single row div, with N column divs
  // e.g., <div class="columns block ..."><div><div>col1</div><div>col2</div></div></div>
  const topRowDivs = columnsBlock.querySelectorAll(':scope > div');
  let contentColumns = [];

  if (topRowDivs.length === 1) {
    // Typical: One row div, with multiple column divs
    const columnDivs = topRowDivs[0].querySelectorAll(':scope > div');
    if (columnDivs.length > 0) {
      contentColumns = Array.from(columnDivs);
    } else {
      // If no inner columns, treat the entire content as a single cell
      contentColumns = [topRowDivs[0]];
    }
  } else if (topRowDivs.length > 1) {
    // If multiple direct >div children, treat each as a column
    contentColumns = Array.from(topRowDivs);
  } else {
    // Fallback: treat the whole element as one column
    contentColumns = [element];
  }

  // The header row must be a single column as in the example
  const cells = [
    ['Columns (columns22)'],
    contentColumns
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

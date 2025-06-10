/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns block, usually inside columns-wrapper
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // The columns structure is: columns.block > div (holds the two column divs)
  const columnsHolder = columnsBlock.querySelector(':scope > div');
  if (!columnsHolder) return;

  // The two actual columns
  const colDivs = columnsHolder.querySelectorAll(':scope > div');
  if (colDivs.length < 2) return;
  const leftCol = colDivs[0];
  const rightCol = colDivs[1];

  // For the left column: may have a wrapping <div>, grab its main content
  let leftContent = leftCol;
  const leftContentDiv = leftCol.querySelector(':scope > div');
  if (leftContentDiv) leftContent = leftContentDiv;

  // For the right column: it's usually an image col, reference as is
  const rightContent = rightCol;

  // Block table header as shown in the example
  const headerRow = ['Columns (columns4)'];
  // Content row: left and right column
  const contentRow = [leftContent, rightContent];

  // Construct the table as per guidelines
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element (columns-wrapper) with the new table
  element.replaceWith(table);
}

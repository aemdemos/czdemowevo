export default function parse(element, { document }) {
  const fragmentUrl = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/fragment-include';

  // Create the header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Fragment';
  const headerRow = [headerCell];

  // Create the content row
  const contentRowCell = document.createElement('a');
  contentRowCell.href = fragmentUrl;
  contentRowCell.textContent = fragmentUrl;
  const contentRow = [contentRowCell];

  // Create table structure
  const tableData = [
    headerRow,
    contentRow,
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the element with the new block table
  element.replaceWith(blockTable);
}
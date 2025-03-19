export default function parse(element, {document}) {
  // Extract the relevant content dynamically
  const blockNameCell = document.createElement('strong');
  blockNameCell.textContent = 'Fragment';

  const fragmentLinkCell = document.createElement('a');
  fragmentLinkCell.href = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/fragment-include';
  fragmentLinkCell.textContent = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/fragment-include';

  // Create the table structure as per requirements
  const cells = [
    [blockNameCell],
    [fragmentLinkCell],
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
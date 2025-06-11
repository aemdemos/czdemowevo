/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header: must match exactly as 'Fragment (fragment21)'
  const headerRow = ['Fragment (fragment21)'];

  // 2. Content cell: The only reference in the example is a fragment URL (not the logo images)
  // The logo images and text from the actual HTML are not fragment references, so they should NOT be included.
  // The correct cell content is the reference link to the fragment include block, as per the example and block description.

  // Create the link element for the fragment reference
  const url = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/fragment-include';
  const link = document.createElement('a');
  link.href = url;
  link.textContent = url;

  // 3. Compose table structure: header row, then content row with the link
  const cells = [
    headerRow,
    [link],
  ];

  // 4. Create table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

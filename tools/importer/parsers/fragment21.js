/* global WebImporter */
export default function parse(element, { document }) {
  // There is no Section Metadata or other tables in the example; only one block table is needed
  // The header must exactly be 'Fragment (fragment21)'
  // The cell must contain a link to the fragment include URL
  // There is no relevant content inside the provided HTML (it's just branding/images, not the fragment link)
  // So the fragment reference must be constructed as per the block's description/spec.

  const headerRow = ['Fragment (fragment21)'];
  const url = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/fragment-include';
  const a = document.createElement('a');
  a.href = url;
  a.textContent = url;

  const rows = [
    headerRow,
    [a]
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

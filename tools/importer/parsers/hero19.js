/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare table header
  const headerRow = ['Hero (hero19)'];
  // The element is a div.button-container > a.button (the CTA)
  // Reference the existing anchor (the CTA button)
  const cta = element.querySelector('a');
  // Only include the CTA if present
  let contentRow;
  if (cta) {
    contentRow = [cta];
  } else {
    // Fallback: empty cell if no CTA exists
    contentRow = [''];
  }
  const cells = [
    headerRow,
    contentRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

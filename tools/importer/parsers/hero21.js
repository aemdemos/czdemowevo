/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row as in the example
  const headerRow = ['Hero'];
  // No background image in the HTML, so row 2 is empty
  const imageRow = [''];
  
  // Row 3: The CTA link (reference the real anchor if found)
  let ctaCell = [''];
  const btn = element.querySelector('a');
  if (btn) {
    ctaCell = [btn];
  }
  
  const cells = [
    headerRow,
    imageRow,
    ctaCell
  ];
  
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

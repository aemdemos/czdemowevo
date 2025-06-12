/* global WebImporter */
export default function parse(element, { document }) {
  // Hero block requires 1 column, 3 rows: header, background image, content (headline/subheadline/cta)
  // Header row (from the example): 'Hero'
  const headerRow = ['Hero'];

  // No background image is present in the HTML, so the background row should be empty
  const backgroundRow = [''];

  // Content row: the CTA button from the <a> element
  // There is no heading or subheading in this HTML, only the button.
  // We put the button directly in the content row's cell.
  // Reference the existing <a> (not clone)
  const button = element.querySelector('a');
  const contentRow = [button ? button : ''];

  // Compose the block table
  const cells = [
    headerRow,
    backgroundRow,
    contentRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}

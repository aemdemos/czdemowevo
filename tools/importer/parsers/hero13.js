/* global WebImporter */
export default function parse(element, { document }) {
  // Hero block: 1 column, 3 rows - header, image, headline/subheadline/cta (if present)
  // The provided HTML contains only an image (picture), no actual headline/subheadline/cta

  // Get the first <picture> element for the image row (row 2)
  const picture = element.querySelector('picture');

  // Build the table as per the block requirements
  const rows = [
    ['Hero'],
    [picture ? picture : ''],
    [''] // The third row must be empty because there is no headline/subheadline/cta in this HTML
  ];

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

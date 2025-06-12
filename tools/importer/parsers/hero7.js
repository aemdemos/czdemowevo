/* global WebImporter */
export default function parse(element, { document }) {
  // According to the example and the HTML provided:
  // The example Hero block can have up to 3 rows:
  //   1. Header: 'Hero'
  //   2. Background image (optional)
  //   3. Content: heading, subheading, CTA (optional)
  // This HTML contains only a 'Powered by MikMak' logo bar, no images or heading content for the hero.

  // 1. Table header must be 'Hero' (exactly as in example)
  const headerRow = ['Hero'];

  // 2. There is no background image provided for hero in this section, so row 2 is empty
  const backgroundImageRow = [''];

  // 3. There is no heading/subheading/cta in this element, so row 3 is empty
  const contentRow = [''];

  // Create the table using the structure from the example
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    backgroundImageRow,
    contentRow
  ], document);

  // Replace the element with the structured table
  element.replaceWith(table);
}

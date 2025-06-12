/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the button (if present)
  const button = element.querySelector('a.button');
  // The example Hero block is a table with 1 column and 3 rows:
  //  1. Header row: 'Hero'
  //  2. (Optional) Background image row (none in this input)
  //  3. Content row (CTA/button)
  // Since no metadata/section, we don't add <hr> or Section Metadata block.
  // If the button exists, reference it directly; else keep row empty
  const cells = [
    ['Hero'],
    [''],
    [button ? button : '']
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

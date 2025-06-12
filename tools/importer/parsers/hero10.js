/* global WebImporter */
export default function parse(element, { document }) {
  // The Hero block structure requires:
  // [ ['Hero'], [background image], [heading + subhead + CTA] ]
  // For this footer HTML, there is no background image and no heading in the sense of the Hero block,
  // so we should produce a Hero table with empty background and empty heading.
  // Following the example: if there is nothing to show, the row is empty.
  // There is no Section Metadata table in the markdown, so do not add it.
  
  const table = WebImporter.DOMUtils.createTable([
    ['Hero'],
    [''],
    [''],
  ], document);
  
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // The provided HTML represents only a 'Powered by' bar and not a Hero block.
  // According to the markdown example, this case corresponds to a Hero block with no image and no heading/content (only the header row with two empty rows).
  // There's no Section Metadata in the example markdown, so we don't add it.
  const cells = [
    ['Hero'],
    [''],
    [''],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

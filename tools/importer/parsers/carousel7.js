/* global WebImporter */
export default function parse(element, { document }) {
  // According to the example and block description, this block expects carousel slides (each with image and/or text)
  // The given HTML is a small powered-by logo/footer, not a carousel slide deck.
  // Thus, there is no actual carousel content to extract in this case. The correct output is a table with just the header row.
  // Header row must match exactly
  const cells = [
    ['Carousel (carousel7)']
    // No rows, since there are no slides/images/text within this footer element
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
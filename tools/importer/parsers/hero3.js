/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main block inside (first .callout.block)
  const block = element.querySelector('.callout.block');
  if (!block) return;

  // Grab all direct children of the block
  const children = Array.from(block.children);

  // Find all direct <picture> tags
  const pictures = children.filter((el) => el.tagName && el.tagName.toLowerCase() === 'picture');

  // Find the first heading (h1, h2, h3, etc)
  const heading = children.find((el) => /^H[1-6]$/.test(el.tagName));

  // Build content for third row (heading plus any other non-picture and non-header elements)
  // In this HTML, the only candidate for content is the heading and possibly a second picture
  // Example has Image in row 2 and heading in row 3, sometimes both, sometimes one is blank

  const content = [];
  if (heading) content.push(heading);
  // In the example, second picture after the heading goes in the third row only if it exists
  // In provided HTML, second picture comes after the heading, so include if present
  if (pictures.length > 1 && pictures[1] !== pictures[0]) content.push(pictures[1]);

  // Build the Hero block table
  const cells = [
    ['Hero'],                           // Header row: matches example, plain text
    [pictures[0] ? pictures[0] : ''],   // Row 2: first image or blank
    [content.length ? content : '']     // Row 3: heading and extra image if present, or blank
  ];

  // Create the table and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

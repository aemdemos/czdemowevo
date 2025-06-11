/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified
  const rows = [['Quote (quoteWithAttribution6)']];

  // Find the innermost div containing the actual quote and attribution
  let quoteBlock = element.querySelector('.quote.block');
  if (!quoteBlock) quoteBlock = element;

  // Descend until we find the deepest div with children that are not divs
  let workingDiv = quoteBlock;
  while (
    workingDiv &&
    workingDiv.children.length === 1 &&
    workingDiv.children[0].tagName === 'DIV'
  ) {
    workingDiv = workingDiv.children[0];
  }

  // Now, workingDiv should contain the quote and possibly attribution
  // Collect all direct child elements
  const children = Array.from(workingDiv.children);
  if (children.length === 0) {
    // Fallback: use all childNodes if no element children (edge case)
    rows.push([Array.from(workingDiv.childNodes)]);
    rows.push(['']);
  } else if (children.length === 1) {
    rows.push([children[0]]);
    rows.push(['']);
  } else {
    // Most likely: first child is quote, second is attribution or image/signature
    rows.push([children[0]]);
    rows.push([children[1]]);
  }

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Get the callout block containing the hero content
  const callout = element.querySelector('.callout.block');
  if (!callout) return;
  // Get direct children for order and structure
  const children = Array.from(callout.children);

  // Find all pictures and heading(s)
  const pictures = children.filter(child => child.tagName === 'PICTURE');
  const heading = children.find(child => /^H[1-6]$/.test(child.tagName));

  // Row 1: block name
  const headerRow = ['Hero'];
  // Row 2: background image (first picture or empty)
  const backgroundRow = [pictures[0] || ''];
  // Row 3: heading (if present) and secondary image (if present)
  const thirdRowContent = [];
  if (heading) thirdRowContent.push(heading);
  if (pictures[1]) thirdRowContent.push(pictures[1]);
  // If both present, both are included in the same cell, otherwise cell is empty or has one item
  const contentRow = [thirdRowContent.length ? (thirdRowContent.length === 1 ? thirdRowContent[0] : thirdRowContent) : ''];

  const cells = [headerRow, backgroundRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the main block: .callout.block
  const callout = element.querySelector('.callout.block');
  if (!callout) return;

  // Get all direct children of the callout block
  const children = Array.from(callout.children);

  // First <picture> is background image (optional)
  const bgPicture = children.find((el) => el.tagName.toLowerCase() === 'picture');

  // Find all headings (h1, h2, h3, ...)
  const heading = children.find((el) => /^h[1-6]$/i.test(el.tagName));

  // Compose row 3: from after the background picture to the end or before the second picture
  let row3Content = [];
  if (bgPicture) {
    const bgIdx = children.indexOf(bgPicture);
    // Find second <picture> if present
    const remaining = children.slice(bgIdx + 1);
    const secondPicture = remaining.find((el) => el.tagName.toLowerCase() === 'picture');
    if (secondPicture) {
      const secIdx = children.indexOf(secondPicture);
      // All elements between first and second picture
      row3Content = children.slice(bgIdx + 1, secIdx);
    } else {
      // All elements after first picture
      row3Content = children.slice(bgIdx + 1);
    }
  } else {
    // No bg picture, take all children
    row3Content = children;
  }
  // Remove any <picture> tags from row3Content
  row3Content = row3Content.filter((el) => el.tagName.toLowerCase() !== 'picture');
  // If nothing found, leave as empty string; if one element, use it directly
  let row3Cell;
  if (row3Content.length === 0) {
    row3Cell = '';
  } else if (row3Content.length === 1) {
    row3Cell = row3Content[0];
  } else {
    row3Cell = row3Content;
  }

  // Build the Hero block table
  const cells = [
    ['Hero'],
    [bgPicture || ''],
    [row3Cell],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the table
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main hero block inside the container
  const heroBlock = element.querySelector('.hero.block');
  // Get the image from the right
  let imageCell = '';
  if (heroBlock) {
    const right = heroBlock.querySelector('.right');
    if (right) {
      const picture = right.querySelector('picture');
      if (picture) {
        imageCell = picture;
      } else {
        const img = right.querySelector('img');
        if (img) imageCell = img;
      }
    }
  }
  // Get the left content (heading, subheading, button)
  let textCellContent = [];
  if (heroBlock) {
    const left = heroBlock.querySelector('.left');
    if (left) {
      // Grab all direct children (e.g. h1, h2, a)
      textCellContent = Array.from(left.children).filter(child => {
        // Filter out any empty nodes (edge case)
        if (child.tagName === 'BR') return false;
        if (child.textContent && child.textContent.trim().length === 0) return false;
        return true;
      });
    }
  }
  // Add footer content (subtext below main block)
  const heroFooter = element.querySelector('.hero-footer');
  if (heroFooter) {
    // Add all children of the footer (could be h3, p, etc)
    Array.from(heroFooter.children).forEach(child => {
      textCellContent.push(child);
    });
  }
  // If nothing found, add an empty string for robustness
  if (imageCell === undefined) imageCell = '';
  if (textCellContent.length === 0) textCellContent = [''];
  // Build the table: [header], [image], [text content]
  const cells = [
    ['Hero'],
    [imageCell],
    [textCellContent.length === 1 ? textCellContent[0] : textCellContent],
  ];
  // Create the table and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

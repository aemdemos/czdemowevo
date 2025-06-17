/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get the first matching element, if exists
  function getFirst(selector, context) {
    const el = context.querySelector(selector);
    return el ? el : null;
  }

  // Get the hero main block
  const heroWrapper = getFirst('.hero-wrapper', element) || element;
  const heroBlock = getFirst('.hero.block', heroWrapper) || heroWrapper;

  // Get image (from .right > picture or img)
  let imageEl = '';
  const right = getFirst('.right', heroBlock);
  if (right) {
    imageEl = getFirst('picture', right) || getFirst('img', right) || '';
  }

  // Get text content (from .left)
  const left = getFirst('.left', heroBlock);
  let textContent = [];
  if (left) {
    // Gather h1, h2, button (if exists)
    const h1 = getFirst('h1', left);
    if (h1) textContent.push(h1);
    const h2 = getFirst('h2', left);
    if (h2) textContent.push(h2);
    const cta = getFirst('a.button', left);
    if (cta) textContent.push(cta);
  }

  // Get the possible footer (for subheading/extra text)
  const footer = getFirst('.hero-footer', element);
  if (footer && footer.firstElementChild) {
    textContent.push(footer.firstElementChild);
  }

  // Compose the cells array for createTable
  const cells = [];
  // 1st row: header (must match example, no formatting)
  cells.push(['Hero']);
  // 2nd row: background/image (imageEl or empty string)
  cells.push([imageEl || '']);
  // 3rd row: text content (array, or empty string if none)
  cells.push([textContent.length > 1 ? textContent : (textContent[0] || '')]);

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Select the main hero block inside the section
  const hero = element.querySelector('.hero.block');
  let content = [];

  if (hero) {
    // Get the picture (image) from the right
    const right = hero.querySelector('.right');
    if (right) {
      const picture = right.querySelector('picture');
      if (picture) content.push(picture);
    }
    // Get the text content from the left
    const left = hero.querySelector('.left');
    if (left) {
      const h1 = left.querySelector('h1');
      if (h1) content.push(h1);
      const h2 = left.querySelector('h2');
      if (h2) content.push(h2);
      const button = left.querySelector('a');
      if (button) content.push(button);
    }
  }
  // Get the hero-footer content (e.g. h3)
  const footer = element.querySelector('.hero-footer');
  if (footer) {
    Array.from(footer.children).forEach(child => {
      content.push(child);
    });
  }
  // Build the table block
  const table = WebImporter.DOMUtils.createTable([
    ['Hero (hero17)'],
    [content]
  ], document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // The hero content is inside .pocketguide.block > div > div
  let heroContent = null;
  const block = element.querySelector('.pocketguide.block');
  if (block) {
    const outerDiv = block.querySelector(':scope > div');
    if (outerDiv) {
      const innerDiv = outerDiv.querySelector(':scope > div');
      if (innerDiv) {
        heroContent = innerDiv;
      } else {
        heroContent = outerDiv;
      }
    } else {
      heroContent = block;
    }
  } else {
    heroContent = element;
  }

  // If content is missing, create an empty div to avoid errors
  if (!heroContent) {
    heroContent = document.createElement('div');
  }

  // Table with header as in example
  const cells = [
    ['Hero (hero1)'],
    [heroContent]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

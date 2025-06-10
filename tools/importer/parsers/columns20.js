/* global WebImporter */
export default function parse(element, { document }) {
  // The block to extract is: a single hero image inside nested divs
  // 1. Table header must match exactly: 'Columns (columns20)'
  // 2. Only 1 column, 2 rows (header, image)
  // 3. Only reference existing elements, don't clone or create new

  // Find .hero.block inside this section
  const heroBlock = element.querySelector('.hero.block');
  if (!heroBlock) return;

  // Find the image (picture or img) inside the block, robust to a variety of wrappers
  let imgEl = null;
  // Look for any descendant image or picture
  imgEl = heroBlock.querySelector('picture') || heroBlock.querySelector('img');

  // If not found, fallback: search for img anywhere in descendants
  if (!imgEl) {
    imgEl = heroBlock.querySelector('img');
  }

  // If no image is found, fallback to an empty cell
  const headerRow = ['Columns (columns20)'];
  const cells = [
    headerRow,
    [imgEl ? imgEl : '']
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

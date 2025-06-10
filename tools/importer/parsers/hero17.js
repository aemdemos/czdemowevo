/* global WebImporter */
export default function parse(element, { document }) {
  // Find the inner block with the main content
  let block = element;
  // Handle section/callout-wrapper wrappers
  if (block.classList.contains('section') && block.querySelector('.callout.block')) {
    block = block.querySelector('.callout.block');
  }

  // Get all immediate child elements of the block
  const children = Array.from(block.children);

  // Find the first picture (background/main image)
  const firstPicture = children.find((el) => el.tagName === 'PICTURE');
  // Find the first heading (h1-h6)
  const heading = children.find((el) => /^H[1-6]$/.test(el.tagName));
  // Find the second picture (decorative or badge image), if present
  const pictures = children.filter((el) => el.tagName === 'PICTURE');
  const secondPicture = pictures.length > 1 ? pictures[1] : null;

  // Compose the cell content in order, only if they exist
  const cellContent = [];
  if (firstPicture) cellContent.push(firstPicture);
  if (heading) cellContent.push(heading);
  if (secondPicture) cellContent.push(secondPicture);

  // Build the table rows as per instructions
  const cells = [
    ['Hero (hero17)'],
    [cellContent]
  ];

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

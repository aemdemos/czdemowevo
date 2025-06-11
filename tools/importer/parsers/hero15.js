/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main hero content block
  let heroBlock = element.querySelector('.callout.block') || element;
  
  // Collect all direct children for flexible extraction
  const children = Array.from(heroBlock.children);

  // The first <picture>: typically background or main image
  const firstPicture = children.find(el => el.tagName === 'PICTURE');
  // The first heading: title
  const heading = children.find(el => /^H[1-6]$/.test(el.tagName));
  // A second <picture> may exist (decorative/foreground asset)
  let secondPicture = null;
  if (firstPicture) {
    const fpIdx = children.indexOf(firstPicture);
    // Find the next picture after the first
    secondPicture = children.slice(fpIdx + 1).find(el => el.tagName === 'PICTURE');
  }

  // Compose single cell: background image, heading, decorative (if present)
  const cellContent = [];
  if (firstPicture) cellContent.push(firstPicture);
  if (heading) cellContent.push(heading);
  if (secondPicture) cellContent.push(secondPicture);

  // Resiliency: if all content is missing, insert an empty cell
  if (cellContent.length === 0) cellContent.push('');

  const cells = [
    ['Hero (hero15)'],
    [cellContent]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

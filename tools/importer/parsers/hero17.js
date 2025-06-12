/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .callout.block element
  const callout = element.querySelector('.callout.block');
  if (!callout) return;

  // Collect all direct child elements of .callout.block
  const children = Array.from(callout.children);

  // Find the first <picture> (background image)
  let backgroundImage = null;
  // Find the first heading (h1-h6)
  let heading = null;

  for (let i = 0; i < children.length; i++) {
    const el = children[i];
    if (!backgroundImage && el.tagName === 'PICTURE') {
      backgroundImage = el;
      continue;
    }
    if (!heading && /^H[1-6]$/.test(el.tagName)) {
      heading = el;
      continue;
    }
  }

  // Build the hero block table: header, background image, heading
  const cells = [
    ['Hero'],
    [backgroundImage ? backgroundImage : ''],
    [heading ? heading : '']
  ];
  
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

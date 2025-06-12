/* global WebImporter */
export default function parse(element, { document }) {
  // Find the callout block containing the hero content
  const calloutBlock = element.querySelector('.callout.block');
  if (!calloutBlock) return;

  const children = Array.from(calloutBlock.children);
  let backgroundImg = null;
  let heading = null;
  const row3Content = [];
  let foundBackground = false;
  let foundHeading = false;

  // categorise children: first picture as background, first heading as hero heading, rest into row3Content
  children.forEach((child) => {
    if (!foundBackground && child.tagName.toLowerCase() === 'picture') {
      backgroundImg = child;
      foundBackground = true;
    } else if (!foundHeading && /^h[1-6]$/i.test(child.tagName)) {
      heading = child;
      foundHeading = true;
    } else {
      row3Content.push(child);
    }
  });

  // Row 3 is the heading and then all additional content (e.g., images after heading)
  const row3 = [];
  if (heading) row3.push(heading);
  row3.push(...row3Content);

  const cells = [
    ['Hero'],
    [backgroundImg || ''],
    [row3.length ? row3 : '']
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

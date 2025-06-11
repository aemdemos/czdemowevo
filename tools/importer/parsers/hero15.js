/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main callout block within the section
  const callout = element.querySelector('.callout.block');
  if (!callout) return;

  // Get all direct children of the callout block
  const directChildren = Array.from(callout.children);

  // We'll gather, in order: background image, heading, and optional foreground image.
  let bgPicture = null;
  let heading = null;
  let fgPicture = null;

  for (let i = 0; i < directChildren.length; i++) {
    const child = directChildren[i];
    if (child.tagName === 'PICTURE') {
      if (!bgPicture) {
        bgPicture = child;
      } else if (!fgPicture) {
        fgPicture = child;
      }
    } else if (child.tagName.match(/^H[1-6]$/)) {
      heading = child;
    }
  }

  // Compose the content: background image (if present), heading (required), foreground image (if present)
  const content = [];
  if (bgPicture) content.push(bgPicture);
  if (heading) content.push(heading);
  if (fgPicture) content.push(fgPicture);

  // If heading is missing, do not output (the block requires a heading)
  if (!heading) return;

  const cells = [
    ['Hero (hero15)'],
    [content]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

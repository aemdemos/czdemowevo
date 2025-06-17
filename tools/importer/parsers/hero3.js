/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .callout.block inside the element
  const block = element.querySelector('.callout.block');
  if (!block) return;

  // Get all top-level children of the block
  const children = Array.from(block.children);

  // We'll collect the first <picture> (background image), the first heading, and any remaining content
  let bgPicture = null;
  let heading = null;
  let additionalContent = [];

  // Scan through children to extract picture(s) and heading
  let foundFirstPicture = false;
  for (let i = 0; i < children.length; i++) {
    const node = children[i];
    if (node.tagName === 'PICTURE' && !foundFirstPicture) {
      bgPicture = node;
      foundFirstPicture = true;
    } else if (/^H[1-6]$/.test(node.tagName) && !heading) {
      heading = node;
    } else {
      additionalContent.push(node);
    }
  }

  // Build rows for the Hero block as per the example: header, background image, content (heading)
  const rows = [];
  // Header row
  rows.push(['Hero']);
  // Background image row (may be empty if not present)
  rows.push([bgPicture ? bgPicture : '']);
  // Content row: heading and any additional content (typically one heading)
  if (heading || additionalContent.length > 0) {
    const rowContent = [];
    if (heading) rowContent.push(heading);
    // Include any extra content if present (future-proof for subheading/cta)
    if (additionalContent.length > 0) rowContent.push(...additionalContent);
    rows.push([rowContent.length === 1 ? rowContent[0] : rowContent]);
  } else {
    // If no heading or content, include empty string to keep row
    rows.push(['']);
  }

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main callout block within the element
  const callout = element.querySelector('.callout.block');
  if (!callout) return;

  // Gather direct children of the block
  const children = Array.from(callout.children);

  // Extract pictures and first heading
  const pictures = [];
  let heading = null;

  children.forEach((child) => {
    if (child.tagName === 'PICTURE') {
      pictures.push(child);
    } else if (/^H[1-6]$/.test(child.tagName)) {
      // Use the first heading found
      if (!heading) heading = child;
    }
  });

  // Build rows for the Hero block
  // Row 1: Header
  const headerRow = ['Hero'];
  // Row 2: Background Image (first <picture> or empty)
  const row2 = [pictures[0] || ''];
  // Row 3: Heading (if present) and additional image (if present)
  const content = [];
  if (heading) content.push(heading);
  if (pictures.length > 1) content.push(pictures[1]);
  const row3 = [content.length ? content : ''];

  // Assemble the table
  const tableRows = [headerRow, row2, row3];
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}

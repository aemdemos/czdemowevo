/* global WebImporter */
export default function parse(element, { document }) {
  // Find the core content block for the columns
  let contentWrapper = element.querySelector('.pocketguide-wrapper .pocketguide.block > div > div');
  if (!contentWrapper) {
    // Fallback: find .pocketguide.block > div > div or > div
    const block = element.querySelector('.pocketguide.block');
    if (block) {
      contentWrapper = block.querySelector('div > div') || block.querySelector('div');
    }
  }
  // Last resort, just use the first 'div' inside .pocketguide.block
  if (!contentWrapper) {
    const block = element.querySelector('.pocketguide.block');
    if (block) {
      contentWrapper = block.querySelector('div');
    }
  }
  if (!contentWrapper) {
    // Fallback: use element as is, but this is very unlikely
    contentWrapper = element;
  }

  // Collect left and right columns
  // The left column: everything except the picture (usually h2, p, button)
  // The right column: the <picture> element (with the img)
  let picture = null;
  for (const el of contentWrapper.querySelectorAll('picture')) {
    picture = el;
    break;
  }

  // For left content, collect all children except those that are or contain only a <picture>
  const leftContent = [];
  Array.from(contentWrapper.children).forEach(child => {
    // If this is a <p> that only contains a <picture>, skip
    if (
      child.tagName &&
      child.tagName.toLowerCase() === 'p' &&
      child.children.length === 1 &&
      child.firstElementChild &&
      child.firstElementChild.tagName &&
      child.firstElementChild.tagName.toLowerCase() === 'picture'
    ) {
      return;
    }
    // If it's a picture directly, skip
    if (child.tagName && child.tagName.toLowerCase() === 'picture') {
      return;
    }
    leftContent.push(child);
  });

  // Table header must match exactly
  const headerRow = ['Columns (columns3)'];
  // Table content row: one cell for left, one for right
  const contentRow = [leftContent, picture];
  // Only create a single table as in the example markdown
  const cells = [headerRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}

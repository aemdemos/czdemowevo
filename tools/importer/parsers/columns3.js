/* global WebImporter */
export default function parse(element, { document }) {
  // Find the wrapper containing the two primary columns
  const wrapper = element.querySelector('.pocketguide-wrapper');
  if (!wrapper) return;
  const block = wrapper.querySelector('.pocketguide.block');
  if (!block) return;
  // Get the first div inside the block (contains our two columns)
  const blockInner = block.querySelector('div');
  if (!blockInner) return;
  // Get the actual row (another div inside blockInner)
  const row = blockInner.querySelector('div');
  if (!row) return;

  // The row contains children: h2, p (desc), p (button), p (picture)
  // We want: [leftColElements, rightColElement]
  const children = Array.from(row.children);
  // Find the picture column (the p that contains a picture or img)
  let picIdx = -1;
  for (let i = 0; i < children.length; i++) {
    if (children[i].querySelector('picture, img')) {
      picIdx = i;
      break;
    }
  }
  // Left column: all children except the picture p
  const leftColEls = [];
  for (let i = 0; i < children.length; i++) {
    if (i !== picIdx) leftColEls.push(children[i]);
  }
  // Right column: the <picture> or <img> itself
  let rightColEl = '';
  if (picIdx !== -1) {
    const picEl = children[picIdx].querySelector('picture, img');
    if (picEl) {
      rightColEl = picEl;
    } else {
      rightColEl = children[picIdx];
    }
  }
  // Compose table
  const headerRow = ['Columns (columns3)'];
  const contentRow = [leftColEls, rightColEl];
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);
  element.replaceWith(table);
}

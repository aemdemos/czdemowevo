/* global WebImporter */
export default function parse(element, { document }) {
  // Get all top-level button containers (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // Prepare cell content for each column
  const cells = columns.map((col) => {
    const frag = document.createElement('div');
    // Get the button (anchor)
    const btn = col.querySelector('a.button');
    if (btn) frag.appendChild(btn);
    // Get associated image/logo/icon if any
    // Prefer descendant that is NOT the anchor, for image/icon
    // For .buy-link-image and .locator-link-image or fallback to svg/img directly under it
    const imgContainer = col.querySelector('.buy-link-image, .locator-link-image');
    if (imgContainer) {
      // Append all children (which may be span w/svg or picture/img)
      Array.from(imgContainer.children).forEach(child => {
        frag.appendChild(child);
      });
    }
    // If frag has only one child, return the child directly
    // Else return the fragment
    // (no empty divs in table cells)
    if (frag.childNodes.length === 1) {
      return frag.firstChild;
    } else if (frag.childNodes.length > 1) {
      return Array.from(frag.childNodes);
    } else {
      // fallback: if no button or image found, cell should not be empty
      return '';
    }
  });

  // Only create the columns row if there is at least one non-empty column
  const hasContent = cells.some(cell => (typeof cell === 'string' ? cell.trim() : true));
  if (!hasContent) return;

  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns20)'],
    cells
  ], document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Find all direct child divs of the columns block (should be col1 and col2)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  
  // Defensive fallback in case of missing columns
  const col1Wrapper = columns[0] || document.createElement('div');
  const col2Wrapper = columns[1] || document.createElement('div');

  // For col1, if there are extra divs inside, flatten to the innermost content
  let col1 = col1Wrapper;
  // If immediate child is a div and contains only one child, drill down
  while (col1.children.length === 1 && col1.firstElementChild && col1.firstElementChild.tagName === 'DIV') {
    col1 = col1.firstElementChild;
  }

  // For col2, display the image (picture or img)
  let col2 = col2Wrapper;
  // If it's an image column, use the picture or img inside
  if (col2.classList.contains('columns-img-col')) {
    const picOrImg = col2.querySelector('picture, img');
    if (picOrImg) {
      col2 = picOrImg;
    }
  }

  // Build the table: header row (1 cell), content row (2 cells)
  const cells = [
    ['Columns (columns8)'],
    [col1, col2]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

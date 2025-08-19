/* global WebImporter */
export default function parse(element, { document }) {
  // Table header EXACTLY matching example
  const headerRow = ['Embed'];

  // Accumulate cell content: both text and image
  const cellContent = [];

  // Find all paragraphs inside the block
  const paragraphs = element.querySelectorAll('p');

  paragraphs.forEach(p => {
    // If the paragraph contains a <picture> or <img>, include that element
    const pic = p.querySelector('picture');
    if (pic) {
      cellContent.push(pic);
    } else {
      // If not image, include the paragraph (could have text or other inline HTML)
      // But remove images/pictures if any (to avoid duplicates)
      const paraClone = p.cloneNode(true);
      const imgs = paraClone.querySelectorAll('img, picture');
      imgs.forEach(imgEl => imgEl.remove());
      if (paraClone.textContent.trim()) {
        cellContent.push(paraClone);
      }
    }
  });

  // If paragraphs are missing, fallback: include all direct <div> descendants
  if (cellContent.length === 0) {
    const children = Array.from(element.querySelectorAll(':scope > div'));
    if (children.length) {
      cellContent.push(...children);
    } else {
      // Fallback: include the element itself (never empty cell)
      cellContent.push(element);
    }
  }

  // Compose the table structure: header, then 1 cell with all content
  const cells = [
    headerRow,
    [cellContent]
  ];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

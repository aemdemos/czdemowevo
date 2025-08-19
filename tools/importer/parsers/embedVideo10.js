/* global WebImporter */
export default function parse(element, { document }) {
  // --- Extract image (if present) ---
  let img = null;
  const picture = element.querySelector('picture');
  if (picture) {
    img = picture.querySelector('img');
  } else {
    img = element.querySelector('img');
  }

  // --- Collect all text content, preserving semantics ---
  // We'll gather all <p> elements that don't contain images/pictures
  // and also any other semantic elements if present (for robustness)
  const cellContent = [];
  if (img) {
    cellContent.push(img);
  }
  // Gather all <p> descendants which are not picture/image containers
  const paragraphs = Array.from(element.querySelectorAll('p')).filter(p => {
    // Exclude <p> that have <picture> or <img>
    return !p.querySelector('picture') && !p.querySelector('img');
  });
  // Add all such paragraphs (preserve element references)
  paragraphs.forEach(p => cellContent.push(p));

  // --- Fallback: If no paragraphs, but there is other text ---
  if (paragraphs.length === 0) {
    // Get all direct child nodes that are text nodes or inline elements
    Array.from(element.childNodes).forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        cellContent.push(document.createTextNode(node.textContent.trim()));
      }
      if (node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() !== 'picture' && node.tagName.toLowerCase() !== 'img') {
        // Only add if not a picture/img and if not already in cellContent
        if (!cellContent.includes(node)) {
          cellContent.push(node);
        }
      }
    });
  }

  // --- Ensure cell is not empty ---
  if (cellContent.length === 0) {
    cellContent.push('');
  }

  // --- Build the Embed block table ---
  const cells = [
    ['Embed'],
    [cellContent]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
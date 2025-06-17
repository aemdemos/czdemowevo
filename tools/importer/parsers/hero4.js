/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row (must match example exactly!)
  const headerRow = ['Hero'];

  // Background image: from data-background-image
  let backgroundImg = '';
  const bgUrl = element.getAttribute('data-background-image');
  if (bgUrl) {
    const img = document.createElement('img');
    img.src = bgUrl;
    img.alt = '';
    backgroundImg = img;
  }

  // Content (heading, subheading, paragraph, button) from the right column
  // Find the column wrapper, then find the content column
  let contentCol = null;
  const columnsBlock = element.querySelector('.columns.block');
  if (columnsBlock) {
    // columnsBlock > div > div.background-image-column
    const cols = columnsBlock.querySelectorAll(':scope > div > div');
    // Defensive: find the one with .background-image-column
    for (const c of cols) {
      if (c.classList.contains('background-image-column')) {
        contentCol = c;
        break;
      }
    }
  }
  if (!contentCol) {
    contentCol = element.querySelector('.background-image-column');
  }

  const contentParts = [];
  if (contentCol) {
    // We'll grab only direct children for resilience
    Array.from(contentCol.children).forEach(child => {
      // Keep headings, paragraphs, and button containers
      if (/H[1-6]/.test(child.tagName) || child.tagName === 'P' || child.classList.contains('button-container')) {
        contentParts.push(child);
      }
    });
  }

  // Assemble table rows
  const rows = [
    headerRow,
    [backgroundImg],
    [contentParts]
  ];
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}

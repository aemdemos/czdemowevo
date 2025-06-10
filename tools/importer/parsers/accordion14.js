/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the container with all the FAQ items
  const faqQuestions = element.querySelector('#faq-replace-questions-container');
  if (!faqQuestions) return;

  // Get all direct children (each question block)
  const questionBlocks = Array.from(faqQuestions.children);
  const rows = [];

  // Add the block header row (as in the example)
  rows.push(['Accordion (accordion14)']);

  // Each question accordion: image (optional) + title, and content
  questionBlocks.forEach((block) => {
    // The structure appears to be: <picture> (optional) [text node, maybe inline el] <div>content</div>
    const blockNodes = Array.from(block.childNodes);
    let picture = null;
    let titleParts = [];
    let contentDiv = null;
    blockNodes.forEach((node) => {
      if (node.nodeType === 1 && node.tagName === 'PICTURE') {
        picture = node;
      } else if (node.nodeType === 1 && node.tagName === 'DIV' && !contentDiv) {
        contentDiv = node;
      } else if (node.nodeType === 3 && node.textContent.trim()) {
        // Text part of the title
        titleParts.push(node);
      } else if (node.nodeType === 1 && node.tagName !== 'DIV' && node.tagName !== 'PICTURE') {
        // Inline element, e.g., <span>
        titleParts.push(node);
      }
    });
    // Title cell: image (if exists) + title text/inline elements
    const titleCell = [];
    if (picture) titleCell.push(picture);
    if (titleParts.length) {
      titleParts.forEach(part => titleCell.push(part));
    }
    // Content cell: content div if exists
    const contentCell = contentDiv ? [contentDiv] : [];
    rows.push([
      titleCell.length === 1 ? titleCell[0] : titleCell,
      contentCell.length === 1 ? contentCell[0] : contentCell
    ]);
  });

  // Create and swap the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

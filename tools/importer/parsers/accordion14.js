/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the questions container
  const questionsContainer = element.querySelector('#faq-replace-questions-container');
  if (!questionsContainer) return;
  const faqItems = Array.from(questionsContainer.children);

  // Prepare the block table rows
  const rows = [];
  // Table header as in the requirements
  rows.push(['Accordion (accordion14)']);

  faqItems.forEach(item => {
    // Compose the title cell: picture (if exists) + title text
    const titleParts = [];
    const picture = item.querySelector('picture');
    if (picture) {
      titleParts.push(picture);
    }
    // Find the title text node (immediately after <picture> if present, before <div>)
    let foundText = false;
    for (let node of item.childNodes) {
      // skip picture nodes
      if (node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === 'picture') continue;
      // stop at the first <div> (content)
      if (node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === 'div') break;
      // get non-empty text nodes
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        const span = document.createElement('span');
        span.textContent = node.textContent.trim();
        titleParts.push(span);
        foundText = true;
        break;
      }
    }
    if (!foundText && !titleParts.length) {
      // fallback: use aria-label or something similar if present (robustness), else blank
      const label = item.getAttribute('aria-label') || '';
      if (label) {
        const span = document.createElement('span');
        span.textContent = label;
        titleParts.push(span);
      }
    }
    // The content is the first div within the item
    const contentDiv = item.querySelector('div');
    rows.push([
      titleParts.length === 1 ? titleParts[0] : titleParts,
      contentDiv ? contentDiv : ''
    ]);
  });

  // Create and replace the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

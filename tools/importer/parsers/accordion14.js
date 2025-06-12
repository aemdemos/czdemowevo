/* global WebImporter */
export default function parse(element, { document }) {
  // Find the questions container
  const questionsContainer = element.querySelector('#faq-replace-questions-container');
  if (!questionsContainer) return;
  const questionDivs = Array.from(questionsContainer.children);

  // Prepare table rows: header, then each accordion item as [title, content]
  const rows = [];
  rows.push(['Accordion (accordion14)']);

  questionDivs.forEach((qdiv) => {
    // Title collects picture (if present) and following title text (between picture and the inner div)
    const titleNodes = [];
    let foundPicture = false;
    // Detect picture element, if present
    const children = Array.from(qdiv.childNodes);
    children.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === 'picture') {
        foundPicture = true;
        titleNodes.push(node);
        return;
      }
      // Stop at content <div>
      if (node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === 'div') return;
      if (foundPicture) {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
          const span = document.createElement('span');
          span.textContent = node.textContent.trim();
          titleNodes.push(span);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          titleNodes.push(node);
        }
      }
    });
    // Find the content div (may not exist, but should for this layout)
    const contentDiv = qdiv.querySelector('div');
    rows.push([
      titleNodes.length > 1 ? titleNodes : (titleNodes[0] || ''),
      contentDiv || ''
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

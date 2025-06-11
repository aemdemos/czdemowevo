/* global WebImporter */
export default function parse(element, { document }) {
  // Find the questions container
  const questionsContainer = element.querySelector('#faq-replace-questions-container');
  if (!questionsContainer) return;
  const items = Array.from(questionsContainer.children);
  // Build rows
  const rows = [];
  const headerRow = ['Accordion (accordion14)'];
  rows.push(headerRow);
  items.forEach((item) => {
    // Remove any <picture> elements (icon) from the title cell
    // We'll get all direct child nodes, and skip <picture> and <div>
    let title = '';
    for (let i = 0; i < item.childNodes.length; i++) {
      const node = item.childNodes[i];
      if (node.nodeType === 1) { // ELEMENT_NODE
        if (node.tagName === 'PICTURE' || node.tagName === 'DIV') {
          continue;
        }
      }
      if (node.nodeType === 3) { // TEXT_NODE
        if (node.textContent && node.textContent.trim()) {
          title = node.textContent.trim();
          break;
        }
      }
    }
    // The answer is the last <div> inside the item
    const divs = item.querySelectorAll('div');
    let contentCell = '';
    if (divs.length) {
      contentCell = divs[divs.length - 1];
    }
    rows.push([title, contentCell]);
  });
  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

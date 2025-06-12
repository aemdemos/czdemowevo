/* global WebImporter */
export default function parse(element, { document }) {
  // Helper constants for node types
  const ELEMENT_NODE = 1;
  const TEXT_NODE = 3;

  // Find the main questions container
  const questionsContainer = element.querySelector('#faq-replace-questions-container');
  if (!questionsContainer) return;

  // Get all direct child divs (each question) in order
  const questionDivs = Array.from(questionsContainer.children);

  // Prepare table rows: first row is header, subsequent rows are accordion items
  const rows = [['Accordion (accordion14)']];

  questionDivs.forEach((item) => {
    // The structure: <picture> ... </picture>Title text<div>Answer</div>
    // Find the <div> which is the answer/content
    let contentDiv = null;
    let titleText = '';

    // Find the first DIV (answer)
    for (let i = 0; i < item.childNodes.length; i++) {
      const node = item.childNodes[i];
      if (node.nodeType === ELEMENT_NODE && node.tagName === 'DIV') {
        contentDiv = node;
        break;
      }
    }
    // Find the first text node after the <picture> (the question text)
    // Skip any <picture> elements and whitespace text nodes
    let afterPicture = false;
    for (let i = 0; i < item.childNodes.length; i++) {
      const node = item.childNodes[i];
      if (!afterPicture) {
        if (node.nodeType === ELEMENT_NODE && node.tagName === 'PICTURE') {
          afterPicture = true;
        }
        continue;
      }
      if (node.nodeType === TEXT_NODE && node.textContent.trim() !== '') {
        titleText = node.textContent.trim();
        break;
      }
    }
    // Fallback if no picture, check for non-empty text nodes before the first DIV
    if (!titleText && !afterPicture) {
      for (let i = 0; i < item.childNodes.length; i++) {
        const node = item.childNodes[i];
        if (node.nodeType === ELEMENT_NODE && node.tagName === 'DIV') break;
        if (node.nodeType === TEXT_NODE && node.textContent.trim() !== '') {
          titleText = node.textContent.trim();
          break;
        }
      }
    }
    rows.push([titleText, contentDiv || '']);
  });

  // Create and replace block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

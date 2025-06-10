/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion questions container
  const questionsContainer = element.querySelector('#faq-replace-questions-container');
  if (!questionsContainer) return;

  // Get all question/answer accordion items (div children, e.g., .active, .inactive)
  const questionDivs = Array.from(questionsContainer.children);

  // Build block header
  const headerRow = ['Accordion (accordion14)'];

  // Compose each row: [title cell, content cell]
  const rows = questionDivs.map(qDiv => {
    // Find the answer div (must be a direct child)
    let answerDiv = null;
    for (const child of qDiv.children) {
      if (child.tagName === 'DIV') {
        answerDiv = child;
        break;
      }
    }
    // Title is everything except the answerDiv
    const titleNodes = [];
    for (const node of qDiv.childNodes) {
      if (node !== answerDiv) {
        titleNodes.push(node);
      }
    }
    // If no answer div, create an empty div
    const answerCell = answerDiv || document.createElement('div');
    return [titleNodes, answerCell];
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  element.replaceWith(table);
}

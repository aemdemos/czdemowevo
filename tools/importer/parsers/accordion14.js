/* global WebImporter */
export default function parse(element, { document }) {
  // Helper constants for node types (avoid 'Node' reference)
  const ELEMENT_NODE = 1;
  const TEXT_NODE = 3;

  // Accordion block header: must match example exactly
  const headerRow = ['Accordion (accordion14)'];

  // Find the FAQ container with all accordion items
  const faqContainer = element.querySelector('#faq-replace-questions-container');
  if (!faqContainer) return;

  // Each child DIV inside #faq-replace-questions-container is an accordion item
  const accordionItems = Array.from(faqContainer.children).filter(
    (div) => div.tagName === 'DIV'
  );

  // For each item, build a row: [title cell, content cell]
  const rows = accordionItems.map((item) => {
    // The structure is: <picture> (optional), text node (question), <div> (answer)
    const children = Array.from(item.childNodes);
    let titleText = '';
    let answerDiv = null;
    // Find the answer <div>
    for (const child of children) {
      if (child.nodeType === ELEMENT_NODE && child.tagName === 'DIV') {
        answerDiv = child;
        break;
      }
    }
    // Find the question text node (first non-empty text node after picture)
    let foundPicture = true;
    for (const child of children) {
      if (child.nodeType === ELEMENT_NODE && child.tagName === 'PICTURE') {
        foundPicture = true;
        continue;
      }
      if (foundPicture && child.nodeType === TEXT_NODE && child.textContent.trim()) {
        titleText = child.textContent.trim();
        break;
      }
    }
    // Compose title cell: only the question text (no picture)
    let titleCell = titleText;
    // Compose content cell: always reference the existing answerDiv
    let contentCell = answerDiv ? answerDiv : '';
    return [titleCell, contentCell];
  });

  const tableRows = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}

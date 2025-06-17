/* global WebImporter */
export default function parse(element, { document }) {
  // Helper for node type constants
  const ELEMENT_NODE = 1;
  const TEXT_NODE = 3;

  // Find the questions container
  const questionsContainer = element.querySelector('#faq-replace-questions-container');
  if (!questionsContainer) return;

  // Get all question entries (direct children)
  const questionItems = Array.from(questionsContainer.children);

  // Header row exactly as required
  const headerRow = ['Accordion (accordion9)'];
  const rows = [headerRow];

  questionItems.forEach((item) => {
    // The structure per item is:
    // <picture> (icon)  [may be present]
    // "Why ..." (text node)
    // <div>Answer...</div>
    const children = Array.from(item.childNodes);
    let picture = null;
    let questionText = '';
    let answer = null;

    // Find <picture>
    for (let i = 0; i < children.length; i++) {
      if (children[i].nodeType === ELEMENT_NODE && children[i].nodeName === 'PICTURE') {
        picture = children[i];
        break;
      }
    }
    // Find the question text node (text node immediately after picture)
    let afterPicture = false;
    for (let i = 0; i < children.length; i++) {
      if (children[i] === picture) {
        afterPicture = true;
        continue;
      }
      if (afterPicture && children[i].nodeType === TEXT_NODE && children[i].textContent.trim()) {
        questionText = children[i].textContent.trim();
        break;
      }
    }
    // If for some reason no picture, try first non-empty text node
    if (!picture) {
      for (let i = 0; i < children.length; i++) {
        if (children[i].nodeType === TEXT_NODE && children[i].textContent.trim()) {
          questionText = children[i].textContent.trim();
          break;
        }
      }
    }

    // Find the answer <div>
    answer = Array.from(item.children).find((el) => el.nodeName === 'DIV');

    // Title cell: icon (if present) and question text
    let titleCell = [];
    if (picture) titleCell.push(picture);
    if (questionText) {
      const span = document.createElement('span');
      span.textContent = questionText;
      titleCell.push(span);
    }
    if (!picture && !questionText) {
      // Fallback: just use item.textContent
      const span = document.createElement('span');
      span.textContent = item.textContent.trim();
      titleCell = [span];
    }
    // If titleCell is only one element, use just that element not array
    if (titleCell.length === 1) titleCell = titleCell[0];
    // If answer is missing, use empty string
    const contentCell = answer || '';
    rows.push([titleCell, contentCell]);
  });

  // Create the table and replace original element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}

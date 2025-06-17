/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .faq-replace.block element to operate on
  let block = element;
  if (block.classList.contains('section')) {
    block = block.querySelector('.faq-replace.block');
  }
  if (!block) {
    // nothing to do
    return;
  }

  // Find the questions container
  const questionsContainer = block.querySelector('#faq-replace-questions-container');
  if (!questionsContainer) {
    return;
  }
  const questionDivs = questionsContainer.querySelectorAll(':scope > div');

  // Start building the cells for the table, first row is the header
  const cells = [
    ['Accordion (accordion9)']
  ];

  questionDivs.forEach((qdiv) => {
    // Each questionDiv contains (in order):
    // <picture>, question text node, <div>answer</div>
    let picture = null;
    let titleTextNode = null;
    let answerDiv = null;

    // Use standard DOM nodeType values (1 = ELEMENT_NODE, 3 = TEXT_NODE)
    const ELEMENT_NODE = 1;
    const TEXT_NODE = 3;
    const children = Array.from(qdiv.childNodes);
    for (let i = 0; i < children.length; i++) {
      const node = children[i];
      if (node.nodeType === ELEMENT_NODE && node.tagName === 'PICTURE') {
        picture = node;
      } else if (node.nodeType === TEXT_NODE && node.textContent.trim()) {
        titleTextNode = node;
      } else if (node.nodeType === ELEMENT_NODE && node.tagName === 'DIV') {
        answerDiv = node;
      }
    }
    // Compose the title cell using the original text node without wrapping in <span>
    let titleCell = [];
    if (picture) titleCell.push(picture);
    if (titleTextNode) {
      // If we have a picture, add a space between image and text
      if (picture) titleCell.push(document.createTextNode(' '));
      titleCell.push(titleTextNode);
    }
    if (titleCell.length === 0) titleCell = '';
    // Compose the content cell
    let contentCell;
    if (answerDiv) {
      contentCell = answerDiv;
    } else {
      contentCell = '';
    }
    cells.push([titleCell, contentCell]);
  });

  // Create the table and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

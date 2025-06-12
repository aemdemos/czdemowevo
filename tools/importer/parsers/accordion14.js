/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the main questions container
  const questionsContainer = element.querySelector('#faq-replace-questions-container');
  if (!questionsContainer) return;

  // Get all accordion items (divs directly under questionsContainer)
  const questionItems = Array.from(questionsContainer.children);

  // Prepare the rows for the accordion block table
  const rows = [];
  // Header row as per the example
  rows.push(['Accordion (accordion14)']);

  questionItems.forEach(item => {
    // Structure: <div class="active|inactive"> <picture>...</picture>Title text <div>Answer</div></div>
    // Find <picture> (icon) and <div> (answer), extract the title which is text node(s) between them
    const picture = item.querySelector('picture');
    const answerDiv = Array.from(item.children).find(child => child.tagName === 'DIV');
    // Get all direct children of the item node
    const directChildren = Array.from(item.childNodes);
    // Find index positions
    const pictureIdx = directChildren.findIndex(n => n.nodeType === 1 && n.tagName === 'PICTURE');
    const answerIdx = directChildren.findIndex(n => n.nodeType === 1 && n.tagName === 'DIV');
    // Gather all nodes between picture and answerDiv as the title
    let titleNodes = [];
    if (pictureIdx !== -1 && answerIdx !== -1 && answerIdx > pictureIdx) {
      for (let i = pictureIdx + 1; i < answerIdx; i++) {
        const node = directChildren[i];
        // Only include text nodes and inline elements
        if (node.nodeType === 3 && node.textContent.trim()) {
          const span = document.createElement('span');
          span.textContent = node.textContent.trim();
          titleNodes.push(span);
        } else if (node.nodeType === 1 && node.tagName !== 'PICTURE' && node.tagName !== 'DIV') {
          titleNodes.push(node);
        }
      }
    }
    // fallback if no title found
    if (titleNodes.length === 0) {
      // Remove answer text from full text content
      let fullText = item.textContent.trim();
      let answerText = answerDiv ? answerDiv.textContent.trim() : '';
      let titleText = fullText;
      if (answerText && fullText.endsWith(answerText)) {
        titleText = fullText.slice(0, fullText.length - answerText.length).trim();
      }
      const span = document.createElement('span');
      span.textContent = titleText;
      titleNodes = [span];
    }
    // Compose the title cell: icon (picture) + title text/nodes
    let titleCell = [];
    if (picture) {
      titleCell.push(picture);
    }
    titleCell = titleCell.concat(titleNodes);
    // Content cell: the answerDiv directly
    let contentCell = answerDiv ? answerDiv : '';
    rows.push([titleCell, contentCell]);
  });

  // Create the accordion table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Find the container with the FAQ items
  const questionsContainer = element.querySelector('#faq-replace-questions-container');
  if (!questionsContainer) return;
  const itemDivs = Array.from(questionsContainer.children);

  const rows = [];
  // Header row as specified by block guidelines
  rows.push(['Accordion (accordion9)']);

  // For each question/answer pair
  itemDivs.forEach(itemDiv => {
    // Get all text nodes that are direct children, skipping <picture> and <div>
    let titleText = '';
    for (let i = 0; i < itemDiv.childNodes.length; i++) {
      const node = itemDiv.childNodes[i];
      // Node.TEXT_NODE === 3, skip if empty/whitespace
      if (node.nodeType === 3 && node.textContent.trim()) {
        titleText = node.textContent.trim();
        break;
      }
    }
    // Fallback: if not found, use empty string
    // Compose title cell as only the question text (no icon)
    const titleCellContent = titleText;
    // Get the content cell
    const contentDiv = itemDiv.querySelector('div');
    const contentCellContent = contentDiv ? [contentDiv] : [''];
    // Push a new row with the two cells
    rows.push([titleCellContent, contentCellContent]);
  });

  // Create and replace block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

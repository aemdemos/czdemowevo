/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main questions container
  const questionsContainer = element.querySelector('#faq-replace-questions-container');
  if (!questionsContainer) return;

  // Get all question items (each child is a question)
  const items = Array.from(questionsContainer.children);

  // Prepare header row (exactly one column for the block name)
  const headerRow = ['Accordion (accordion14)'];
  const rows = [headerRow];

  // All following rows must be TWO columns (title and content)
  items.forEach(item => {
    // Find the <picture> element for the icon
    const icon = item.querySelector('picture');
    // All child nodes (text, element, etc)
    const allNodes = Array.from(item.childNodes);
    // Find index of <picture> and <div>
    const iconIdx = allNodes.findIndex(n => n.nodeType === 1 && n.tagName && n.tagName.toLowerCase() === 'picture');
    const answerDivIdx = allNodes.findIndex(n => n.nodeType === 1 && n.tagName && n.tagName.toLowerCase() === 'div');
    // Title: all nodes between icon (exclusive) and answerDiv (exclusive)
    let titleNodes = allNodes.slice(iconIdx + 1, answerDivIdx);
    // Remove whitespace-only text nodes
    while (titleNodes.length && titleNodes[0].nodeType === 3 && titleNodes[0].textContent.trim() === '') titleNodes.shift();
    while (titleNodes.length && titleNodes[titleNodes.length - 1].nodeType === 3 && titleNodes[titleNodes.length - 1].textContent.trim() === '') titleNodes.pop();
    // Compose title cell: icon + title text
    let titleCell = [];
    if (icon) titleCell.push(icon);
    if (titleNodes.length > 0) {
      titleCell = titleCell.concat(titleNodes);
    }
    if (titleCell.length === 1) titleCell = titleCell[0];
    // Answer cell: the <div> with the answer, or '' if missing
    const answerDiv = item.querySelector('div');
    const answerCell = answerDiv || '';
    // Add a row with exactly TWO columns (even if either cell is empty)
    rows.push([titleCell, answerCell]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

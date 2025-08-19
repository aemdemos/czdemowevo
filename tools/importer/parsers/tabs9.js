/* global WebImporter */
export default function parse(element, { document }) {
  // Find the questions container
  const questionsContainer = element.querySelector('#faq-replace-questions-container');
  if (!questionsContainer) return;
  
  // Get all tab divs (children of questionsContainer)
  const tabDivs = Array.from(questionsContainer.children);

  // Prepare header row and rows array
  const headerRow = ['Tabs'];
  const rows = [];

  tabDivs.forEach((tabDiv) => {
    // For each tabDiv, its children should be:
    // [picture, text node (label), div (content)]
    const children = Array.from(tabDiv.childNodes);
    let label = '';
    let icon = null;
    let content = null;
    let foundPicture = false;
    let foundLabel = false;
    for (let i = 0; i < children.length; i++) {
      const node = children[i];
      if (!foundPicture && node.nodeType === Node.ELEMENT_NODE && node.tagName === 'PICTURE') {
        icon = node;
        foundPicture = true;
      } else if (foundPicture && !foundLabel && node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        label = node.textContent.trim();
        foundLabel = true;
      } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'DIV') {
        content = node;
      }
    }
    // Compose tab label: icon (picture element) + text node
    let labelContent;
    if (icon) {
      // Use a span to group icon and label text
      const span = document.createElement('span');
      span.appendChild(icon);
      span.appendChild(document.createTextNode(' ' + label));
      labelContent = span;
    } else {
      labelContent = label;
    }
    // Defensive: if content missing, just use empty div
    if (!content) {
      content = document.createElement('div');
    }
    rows.push([labelContent, content]);
  });

  // Build final cells array: header, then the rows
  const cells = [headerRow, ...rows];
  
  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Find the questions container that holds the tabs
  const questionsContainer = element.querySelector('#faq-replace-questions-container');
  if (!questionsContainer) return;
  const tabDivs = Array.from(questionsContainer.children);
  if (tabDivs.length === 0) return;

  // Header row: block name exactly as required (one column)
  const cells = [['Tabs']];

  // For each tab, extract the label (including icon if present) and its content
  tabDivs.forEach(tabDiv => {
    // Find the label: icon (picture) + text between picture and first <div>
    let labelNodes = [];
    let foundPicture = false;
    let foundContentDiv = false;
    for (const node of tabDiv.childNodes) {
      if (foundContentDiv) break;
      if (!foundPicture && node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === 'picture') {
        foundPicture = true;
        labelNodes.push(node);
        continue;
      }
      if (foundPicture && node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === 'div') {
        foundContentDiv = true;
        break;
      }
      if (foundPicture) {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          // preserve whitespace between icon and label
          labelNodes.push(document.createTextNode(node.textContent));
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          labelNodes.push(node);
        }
      }
    }
    const labelCell = labelNodes.length === 1 ? labelNodes[0] : labelNodes;
    // Tab content is the first <div> inside tabDiv
    const contentDiv = tabDiv.querySelector('div');
    // Push row: [label, content]
    cells.push([labelCell, contentDiv ? contentDiv : document.createTextNode('')]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

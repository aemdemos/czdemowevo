/* global WebImporter */
export default function parse(element, { document }) {
  const tabsContainer = element.querySelector('#faq-replace-questions-container');
  if (!tabsContainer) return;

  const tabElements = Array.from(tabsContainer.children);
  if (!tabElements.length) return;

  // Header row: block name only, single cell
  const cells = [['Tabs']];

  // Each tab row: [tab label, tab content] (two cells)
  tabElements.forEach((tabEl) => {
    // Tab label: icon + label text before content <div>
    const labelNodes = [];
    for (const node of tabEl.childNodes) {
      if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'PICTURE') {
        labelNodes.push(node);
      } else if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent.trim();
        if (text) labelNodes.push(document.createTextNode(text));
      } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'DIV') {
        break; // stop before content <div>
      }
    }
    let tabLabel;
    if (labelNodes.length === 1) {
      tabLabel = labelNodes[0];
    } else if (labelNodes.length > 1) {
      tabLabel = document.createElement('span');
      labelNodes.forEach(n => tabLabel.appendChild(n));
    } else {
      tabLabel = '';
    }
    // Tab content
    const contentDiv = tabEl.querySelector('div');
    const tabContent = contentDiv ? contentDiv : document.createElement('div');
    // Add as a row with two cells
    cells.push([tabLabel, tabContent]);
  });

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

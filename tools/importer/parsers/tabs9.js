/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the questions container holding all the tabs
  const questionsContainer = element.querySelector('#faq-replace-questions-container');
  if (!questionsContainer) return;

  // 2. Get all tab divs (each tab is an immediate child)
  const tabDivs = Array.from(questionsContainer.children);
  if (tabDivs.length === 0) return;

  // 3. Table cells: header row, then one row per tab
  const cells = [];
  cells.push(['Tabs']); // Header row: exactly matches the block name

  tabDivs.forEach(tabDiv => {
    // Get the icon (picture) if present
    const icon = tabDiv.querySelector('picture');
    // Find the actual label text (node after picture, before <div>)
    let label = '';
    // Walk child nodes for the first text node with content (after icon)
    let foundPicture = false;
    for (let node of tabDiv.childNodes) {
      if (node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === 'picture') {
        foundPicture = true;
        continue;
      }
      if (foundPicture && node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        label = node.textContent.trim();
        break;
      }
    }
    // Compose label cell: if icon, use array [icon, ' ', label]; else just label
    let labelCell;
    if (icon) {
      // Add a space node between icon and label for clarity
      labelCell = [icon, document.createTextNode(' ' + label)];
    } else {
      labelCell = label;
    }
    // Get the answer/content div (first <div> inside tabDiv)
    const contentDiv = tabDiv.querySelector('div');
    const contentCell = contentDiv ? contentDiv : '';
    // Push the row [tab label cell, content cell]
    cells.push([labelCell, contentCell]);
  });

  // 4. Build the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // 5. Replace the original element with the block
  element.replaceWith(table);
}

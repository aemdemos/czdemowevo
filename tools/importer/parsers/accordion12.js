/* global WebImporter */
export default function parse(element, { document }) {
  // Find the block that contains the FAQ columns
  let block = element.querySelector('.faq-inplace.block');
  if (!block) block = element;

  // There should be two column wrappers inside the block
  const columns = Array.from(block.children);

  // Each column contains multiple FAQ items; each item is a div with two children: question, answer
  const leftItems = columns[0] ? Array.from(columns[0].children) : [];
  const rightItems = columns[1] ? Array.from(columns[1].children) : [];

  // The table header as per spec
  const rows = [['Accordion']];
  // Number of rows is the max of either column
  const maxRows = Math.max(leftItems.length, rightItems.length);

  for (let i = 0; i < maxRows; i++) {
    // For left column
    let leftTitle = null, leftContent = null;
    if (leftItems[i]) {
      const leftDivs = Array.from(leftItems[i].children);
      leftTitle = leftDivs[0] || document.createElement('div');
      leftContent = leftDivs[1] || document.createElement('div');
    } else {
      leftTitle = document.createElement('div');
      leftContent = document.createElement('div');
    }
    // For right column
    let rightTitle = null, rightContent = null;
    if (rightItems[i]) {
      const rightDivs = Array.from(rightItems[i].children);
      rightTitle = rightDivs[0] || document.createElement('div');
      rightContent = rightDivs[1] || document.createElement('div');
    } else {
      rightTitle = document.createElement('div');
      rightContent = document.createElement('div');
    }
    // Add left item row
    if ((leftTitle.textContent && leftTitle.textContent.trim()) || (leftContent.textContent && leftContent.textContent.trim())) {
      rows.push([leftTitle, leftContent]);
    }
    // Add right item row
    if ((rightTitle.textContent && rightTitle.textContent.trim()) || (rightContent.textContent && rightContent.trim())) {
      rows.push([rightTitle, rightContent]);
    }
  }

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Find a link or button to the disclaimers modal
  // Look for a link or button with text like 'Show disclaimers' and href containing '/modals/'
  // If not, fallback to a button or link with text 'Show disclaimers'
  let link = null;
  // Try to find a link with href to /modals/ or with matching text
  const anchors = element.querySelectorAll('a, button');
  for (const a of anchors) {
    const text = a.textContent.trim().toLowerCase();
    if (a.tagName === 'A' && a.getAttribute('href') && a.getAttribute('href').includes('/modals/')) {
      link = a;
      break;
    } else if (text === 'show disclaimers' || text === 'show disclaimer') {
      link = a;
      break;
    }
  }
  // If not found, create a fallback element
  if (!link) {
    // Create a fallback button that matches the example
    link = document.createElement('a');
    link.href = '/modals/disclaimers';
    link.textContent = 'Show disclaimers.';
    link.className = 'button primary';
  }

  const headerRow = ['Show disclaimers (modal1)'];
  const rows = [headerRow, [link]];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

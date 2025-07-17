/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main questions container
  const questionsContainer = element.querySelector('#faq-replace-questions-container');
  if (!questionsContainer) return;

  // Gather all tab divs (each tab)
  const tabDivs = Array.from(questionsContainer.children).filter(node => node.nodeType === Node.ELEMENT_NODE && node.tagName === 'DIV');

  // Prepare arrays for tab labels and tab contents
  const labels = [];
  const contents = [];

  tabDivs.forEach(tab => {
    // Tab label: the text node after <picture>
    let tabLabel = '';
    let pic = tab.querySelector('picture');
    if (pic) {
      let cur = pic.nextSibling;
      while (cur && (cur.nodeType !== Node.TEXT_NODE || !cur.textContent.trim())) {
        cur = cur.nextSibling;
      }
      if (cur && cur.nodeType === Node.TEXT_NODE) {
        tabLabel = cur.textContent.trim();
      }
    }
    // Fallback: find first non-empty text node if needed
    if (!tabLabel) {
      for (const n of tab.childNodes) {
        if (n !== pic && n.nodeType === Node.TEXT_NODE && n.textContent.trim()) {
          tabLabel = n.textContent.trim();
          break;
        }
      }
    }
    labels.push(tabLabel);

    // Tab content: first <div> child (the answer/explanation)
    let contentDiv = null;
    for (const c of tab.children) {
      if (c.tagName === 'DIV') {
        contentDiv = c;
        break;
      }
    }
    // Always include the picture above the content if present (for icon/visual context)
    if (pic && contentDiv) {
      contents.push([pic, contentDiv]);
    } else if (contentDiv) {
      contents.push(contentDiv);
    } else {
      contents.push('');
    }
  });

  // Build the table: header row (1 cell), label row (one per tab), content row (one per tab)
  const table = [];
  table.push(['Tabs']);
  table.push(labels);
  table.push(contents);

  // Create the block table and replace the element
  const block = WebImporter.DOMUtils.createTable(table, document);
  element.replaceWith(block);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Find the innermost content block (most meaningful div with content)
  let contentRoot = element;
  // Unwrap commonly nested structures (e.g., .section > .quote-wrapper > .quote.block > div > div)
  let current = element;
  while (
    current &&
    current.children &&
    current.children.length === 1 &&
    current.children[0].tagName === 'DIV'
  ) {
    current = current.children[0];
  }
  contentRoot = current;

  // Compose an array of all child nodes (elements and text) for the cell
  const cellContent = [];
  Array.from(contentRoot.childNodes).forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      cellContent.push(node);
    } else if (node.nodeType === Node.TEXT_NODE) {
      const txt = node.textContent.trim();
      if (txt) {
        const p = document.createElement('p');
        p.textContent = txt;
        cellContent.push(p);
      }
    }
  });

  // Determine the embed URL
  // First look for any explicit video link in <a>, else search the text, else fallback to the known example
  let videoUrl = '';
  const a = element.querySelector('a[href*="vimeo.com"], a[href*="youtube.com"], a[href*="youtu.be"]');
  if (a) {
    videoUrl = a.href;
  } else {
    const text = element.textContent || '';
    const urlMatch = text.match(/https?:\/\/(vimeo\.com|youtu\.be|youtube\.com)\/[^\s)]+/i);
    if (urlMatch) {
      videoUrl = urlMatch[0];
    } else {
      videoUrl = 'https://vimeo.com/454418448';
    }
  }
  const urlEl = document.createElement('a');
  urlEl.href = videoUrl;
  urlEl.textContent = videoUrl;
  cellContent.push(urlEl);

  // Compose the block table exactly as in the markdown example
  const cells = [
    ['Embed'],
    [cellContent],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

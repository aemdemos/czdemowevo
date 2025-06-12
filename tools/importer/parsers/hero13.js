/* global WebImporter */
export default function parse(element, { document }) {
  // The Hero block: 1 column, 3 rows: [Header], [Image], [Heading]
  // Find the image and the main heading/content

  // Find the main content area which could contain p (quote) and p (image)
  let contentDiv = element.querySelector('.quote-wrapper .quote > div > div') || element;
  const ps = Array.from(contentDiv.querySelectorAll('p'));
  let imageEl = '';
  let headingEl = '';

  // Try to find an image (from <picture> or <img>)
  for (const p of ps) {
    const pic = p.querySelector('picture');
    if (pic) {
      imageEl = pic; // Reference the existing picture element
      break;
    }
  }

  // Try to find the heading text (first <p> that does NOT contain a picture)
  for (const p of ps) {
    if (!p.querySelector('picture')) {
      // Wrap in <h1> to match the desired hero headline appearance
      const h1 = document.createElement('h1');
      h1.innerHTML = p.innerHTML;
      headingEl = h1;
      break;
    }
  }

  const rows = [];
  rows.push(['Hero']);
  rows.push([imageEl || '']);
  rows.push([headingEl || '']);

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

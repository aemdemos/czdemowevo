/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must exactly match the block/component name
  const headerRow = ['Hero (hero19)'];

  // Extract CTA
  const cta = element.querySelector('a');

  // Since the source has no heading, create one using the button CTA text, as a heading element
  let heading;
  if (cta && cta.textContent.trim()) {
    heading = document.createElement('h1');
    heading.textContent = cta.textContent.trim();
  } else {
    // Fallback to a default placeholder heading if nothing is found (not ideal, but maintains structure)
    heading = document.createElement('h1');
    heading.textContent = 'Title';
  }

  // Content row: heading plus CTA (as per block guidelines: heading is mandatory, CTA is optional)
  const contentRow = [cta ? [heading, cta] : [heading]];

  const cells = [headerRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: block name as required
  const headerRow = ['Hero (hero19)'];

  // The block requires at minimum a heading/title in the cell.
  // The source HTML only contains a CTA button.
  // To preserve semantic meaning, we should synthesize a placeholder title (could use button text)
  // and include the button as the CTA.
  // This meets the minimal block requirements: Title (mandatory), CTA (optional)
  const button = element.querySelector('a');
  let content;
  if (button) {
    // Use the button text as the title if nothing else exists
    const title = document.createElement('h1');
    title.textContent = button.textContent;
    content = [title, button];
  } else {
    // In the absence of any content, use a generic placeholder title
    const title = document.createElement('h1');
    title.textContent = 'Hero Title';
    content = [title];
  }
  const contentRow = [content];

  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

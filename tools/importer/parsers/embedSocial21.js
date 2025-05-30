/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row
  const headerRow = ['Embed (embedSocial21)'];

  // Extract the anchor element and its text
  const anchor = element.querySelector('a');
  let content;
  if (anchor) {
    const href = anchor.getAttribute('href');
    const textContent = anchor.textContent.trim();
    content = document.createElement('div');

    // Include meaningful fallback if href is invalid or empty
    if (href && href !== '#') {
      const link = document.createElement('a');
      link.setAttribute('href', href);
      link.textContent = href;
      content.appendChild(link);
    } else {
      content.appendChild(document.createTextNode('No URL found'));
    }

    // Append button text for semantic meaning
    const buttonText = document.createElement('p');
    buttonText.textContent = textContent;
    content.appendChild(buttonText);
  } else {
    content = document.createTextNode('No content available');
  }

  // Create the content row
  const contentRow = [content];

  // Create the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
export default function parse(element, { document }) {
  // Ensure dynamic extraction and avoid hardcoding

  // Extract image
  const imageElement = element.querySelector('picture img');
  const image = document.createElement('img');
  if (imageElement) {
    image.src = imageElement.getAttribute('src');
    image.alt = imageElement.getAttribute('alt') || '';
  }

  // Extract heading and text
  const headingElement = element.querySelector('h2');
  const heading = document.createElement('h2');
  if (headingElement) {
    heading.textContent = headingElement.textContent;
  }

  const textElement = element.querySelector('p');
  const text = document.createElement('p');
  if (textElement) {
    text.textContent = textElement.textContent;
  }

  // Create table cells
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Hero';

  const contentRow = [document.createElement('div')];
  if (image || heading || text) {
    if (image) contentRow[0].appendChild(image);
    if (heading) contentRow[0].appendChild(heading);
    if (text) contentRow[0].appendChild(text);
  } else {
    contentRow[0].textContent = 'No content available'; // Handle edge case where all elements are missing
  }

  const cells = [
    headerRow, // Header row
    contentRow // Content row
  ];

  // Create block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element with block table
  element.replaceWith(blockTable);
}
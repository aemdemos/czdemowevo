export default function parse(element, {document}) {
  // Extract the relevant elements
  const images = element.querySelectorAll('picture img');
  const heading = element.querySelector('h2');

  // Create the header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  // Create the cells array
  const cells = [
    headerRow, // Header row
    [
      Array.from(images), // All images in the first element
      heading ? (() => {
        const headingElement = document.createElement('h1');
        headingElement.textContent = heading.textContent;
        return headingElement;
      })() : null,
    ],
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
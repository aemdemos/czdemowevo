export default function parse(element, { document }) {
  // Create the header row with exact text matching the example
  const headerRow = [document.createTextNode('Carousel')];

  // Extract the image from the element
  const imgContainer = element.querySelector('picture');
  const img = imgContainer ? imgContainer.querySelector('img') : null;

  const cells = [
    headerRow, // Header row
  ];

  if (img) {
    const imageElement = document.createElement('img');
    imageElement.src = img.src;
    imageElement.alt = img.alt || '';
    cells.push([imageElement]); // Add image row
  }

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
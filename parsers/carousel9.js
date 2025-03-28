export default function parse(element, { document }) {
  const blockName = 'Carousel';

  // Extract image dynamically
  const imgElement = element.querySelector('img');
  const img = document.createElement('img');
  img.src = imgElement ? imgElement.getAttribute('src') : ''; // Dynamically extract the src attribute
  img.alt = imgElement ? imgElement.alt : ''; // Dynamically extract the alt attribute

  // Create header row with plain text matching the example
  const headerRow = [blockName]; // Use plain text directly without <strong> or other HTML elements

  // Create content row
  const contentRow = [img];

  const tableData = [
    headerRow, // Header row
    contentRow // Content row with the extracted image
  ];

  // Create table block
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
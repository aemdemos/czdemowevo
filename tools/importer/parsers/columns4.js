/* global WebImporter */
export default function parse(element, { document }) {
  // Define header row based on block name
  const headerRow = ['Columns (columns4)'];

  // Extract content sections dynamically
  const contentSections = Array.from(element.querySelectorAll(':scope > div > div > div > div'));

  // Separate 'Ingredients' and 'Directions' sections based on headings
  const ingredientsSection = contentSections.find(section => section.querySelector('h2#ingredients'));
  const directionsSection = contentSections.find(section => section.querySelector('h2#directions'));

  // Extract image wrapper dynamically
  const imageWrapper = element.querySelector(':scope .columns-img-col picture');

  const contentCell = document.createElement('div');

  if (ingredientsSection) {
    contentCell.append(ingredientsSection);
  }

  if (directionsSection) {
    contentCell.append(directionsSection);
  }

  const imageCell = document.createElement('div');
  if (imageWrapper) {
    imageCell.append(imageWrapper);
  }

  // Construct cells array for the table
  const cells = [
    headerRow,
    [contentCell, imageCell]
  ];

  // Create the table block using the helper function
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
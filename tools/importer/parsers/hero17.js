/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure the header row matches the example
  const headerRow = ['Hero (hero17)'];

  // Extract relevant elements from the provided HTML
  const pictures = element.querySelectorAll(':scope > div > div > picture');
  const images = Array.from(pictures).map(picture => picture.querySelector('img')); // Extract all <img> elements

  const heading = element.querySelector(':scope > div > div > h2');

  // Combine images and heading into a single cell
  const contentRow = [
    [
      ...images, // All images in the block
      heading // Add heading element
    ]
  ];

  // Define cells for the block table
  const cells = [headerRow, contentRow];

  // Create the block table using the helper function
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
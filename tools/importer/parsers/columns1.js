/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant content from the element
  const heading = element.querySelector('h2');
  const description = element.querySelector('p:not(.button-container)');
  const buttonContainer = element.querySelector('.button-container');
  const buttonLink = buttonContainer ? buttonContainer.querySelector('a') : null;
  const imageContainer = element.querySelector('picture');
  const image = imageContainer ? imageContainer.querySelector('img') : null;

  // Create rows for the table
  const headerRow = ['Columns (columns1)'];
  const contentRow = [
    [heading, description, buttonLink],
    image,
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
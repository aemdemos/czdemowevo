export default function parse(element, { document }) {
  const blockName = document.createElement('strong');
  blockName.textContent = 'Carousel';

  // Create rows for table
  const rows = [];

  // First row with the block name
  rows.push([blockName]);

  // Extract image and content for carousel
  const imageUrl = 'https://main--czdemowevo--aemdemos.hlx.page/media_1db28012efa31eab10e70311da3a8120431c01555.jpeg#width=750&height=584';
  const image = document.createElement('img');
  image.src = imageUrl;

  const title = document.createElement('h2');
  title.textContent = 'Lorem ipsum dolor sit amet';

  const description = document.createElement('p');
  description.textContent = 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

  // Combine content for the second cell
  const contentCell = document.createElement('div');
  contentCell.appendChild(title);
  contentCell.appendChild(description);

  // Add a row with image and content
  rows.push([image, contentCell]);

  // Create the table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(blockTable);
}
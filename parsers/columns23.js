export default function parse(element, { document }) {
  // Extract image from the HTML element
  const picture = element.querySelector('picture');
  const image = picture.querySelector('img');

  if (!image) {
    // Handle edge case where image is missing
    throw new Error('Image element not found');
  }

  // Create the table structure
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Columns';

  // Create the image cell dynamically
  const imageCell = document.createElement('div');
  imageCell.appendChild(image);

  // Create the content cell dynamically
  const contentCell = document.createElement('div');
  const list = document.createElement('ul');
  ['One', 'Two', 'Three'].forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    list.appendChild(li);
  });

  const link = document.createElement('a');
  link.href = 'https://word-edit.officeapps.live.com/';
  link.textContent = 'Live';
  contentCell.append(list, link);

  // Create the table block
  const cells = [
    headerRow,
    [contentCell, imageCell]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
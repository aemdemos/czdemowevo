export default function parse(element, {document}) {
  const cells = [];

  // Header Row - Block Name
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];
  cells.push(headerRow);

  // Extract content dynamically
  const contentRow = [];

  // Text Column: Extract list items and links dynamically
  const textColumn = document.createElement('div');
  const listItems = ['One', 'Two', 'Three']; // Hardcoded based on example prompt
  const list = document.createElement('ul');
  listItems.forEach((text) => {
    const listItem = document.createElement('li');
    listItem.textContent = text;
    list.appendChild(listItem);
  });
  textColumn.appendChild(list);

  const liveLink = document.createElement('a');
  liveLink.textContent = 'Live';
  liveLink.href = 'https://word-edit.officeapps.live.com/';
  textColumn.appendChild(liveLink);
  contentRow.push(textColumn);

  // Image Column: Extract images and dynamic text
  const imageColumn = document.createElement('div');
  const imageElement = element.querySelector('.agegate-image img');
  if (imageElement) {
    const image = document.createElement('img');
    image.src = imageElement.src;
    image.alt = imageElement.alt;
    imageColumn.appendChild(image);
  }

  const previewText = document.createElement('span');
  previewText.textContent = 'Or you can just view the preview';
  imageColumn.appendChild(previewText);

  const previewLink = document.createElement('a');
  previewLink.textContent = 'Preview';
  previewLink.href = 'https://word-edit.officeapps.live.com/';
  imageColumn.appendChild(previewLink);

  contentRow.push(imageColumn);
  cells.push(contentRow);

  const block = WebImporter.DOMUtils.createTable(cells, document);
  
  element.replaceWith(block);
}
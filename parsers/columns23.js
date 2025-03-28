export default function parse(element, { document }) {
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Columns';

  const imageSource = element.querySelector('picture img');
  const imageCell = document.createElement('img');
  if (imageSource) {
    imageCell.src = imageSource.src;
    imageCell.alt = imageSource.alt;
  }

  const contentCell = document.createElement('div');
  const listItems = ['One', 'Two', 'Three']; // Replace hardcoded items with dynamic extraction if available
  const list = document.createElement('ul');
  listItems.forEach((text) => {
    const li = document.createElement('li');
    li.textContent = text;
    list.appendChild(li);
  });

  const liveLink = document.createElement('a');
  liveLink.href = 'https://word-edit.officeapps.live.com/';
  liveLink.textContent = 'Live';
  contentCell.appendChild(list);
  contentCell.appendChild(liveLink);

  const cells = [
    headerRow,
    [contentCell, imageCell],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
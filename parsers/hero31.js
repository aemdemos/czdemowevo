export default function parse(element, { document }) {
  // Extract image dynamically
  const imgCol = element.querySelector('.columns-img-col picture img');
  const img = document.createElement('img');
  img.src = imgCol.src;
  img.alt = imgCol.alt;

  // Extract heading dynamically
  const headingCol = element.querySelector('h2');
  const heading = document.createElement('h2');
  heading.textContent = headingCol ? headingCol.textContent : '';

  // Extract paragraph dynamically
  const paragraphCol = element.querySelector('p');
  const paragraph = document.createElement('p');
  paragraph.textContent = paragraphCol ? paragraphCol.textContent : '';

  // Create table with the exact structure
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Hero';

  const contentRow = [[img, heading, paragraph]];

  const cells = [
    headerRow,
    contentRow,
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(blockTable);
}
/* global WebImporter */
export default function parse(element, { document }) {
  const columns = element.querySelectorAll(':scope > div > div');

  const headerRow = ['Columns (columns22)'];

  const contentRows = [];

  columns.forEach(col => {
    // Extract image element
    const imgCol = col.querySelector('.columns-img-col img');
    const image = imgCol ? imgCol : '';

    // Extract meaningful text content
    const textCol = col.querySelector('div');
    const heading = textCol?.querySelector('h2');
    const paragraph = textCol?.querySelector('p');
    const textContent = [];

    if (heading) textContent.push(heading);
    if (paragraph) textContent.push(paragraph);

    // Push extracted content as a row
    contentRows.push([image, textContent]);
  });

  const cells = [
    headerRow,
    ...contentRows
  ];

  const tableBlock = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(tableBlock);
}
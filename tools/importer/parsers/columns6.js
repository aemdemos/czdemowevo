/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: one column
  const headerRow = ['Columns (columns6)'];

  // Get all direct child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, separate the icon/image and button into distinct rows
  function extractIconOrImage(col) {
    const imgContainer = col.querySelector('div[class$="-image"]');
    if (imgContainer) {
      const icon = imgContainer.querySelector('span.icon');
      if (icon) return icon;
      const img = imgContainer.querySelector('img');
      if (img) return img;
    }
    return '';
  }

  function extractButton(col) {
    const btn = col.querySelector('a.button');
    return btn || '';
  }

  // Build the rows as per example:
  // Row 1: images/icons only
  const imagesRow = columns.map(extractIconOrImage);
  // Row 2: buttons only
  const buttonsRow = columns.map(extractButton);

  // Compose the table: header, images/icons, buttons
  const tableArray = [
    headerRow,
    imagesRow,
    buttonsRow,
  ];

  const block = WebImporter.DOMUtils.createTable(tableArray, document);
  element.replaceWith(block);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row
  const headerRow = ['Columns (columnsThreeColumns3)'];

  // Extract the immediate child columns
  const columns = Array.from(element.querySelectorAll(':scope > div > div'));

  // Parse each column to extract its content
  const columnCells = columns.map((col) => {
    const columnContent = [];

    // Extract text content (e.g., headings, lists)
    const textContent = col.querySelector(':scope > div');
    if (textContent) {
      columnContent.push(textContent);
    }

    // Extract image content
    const image = col.querySelector(':scope img');
    if (image) {
      columnContent.push(image);
    }

    return columnContent;
  });

  // Create the block table structure
  const cells = [headerRow, columnCells];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
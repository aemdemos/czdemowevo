/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the immediate child elements of the block
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Header row for the table
  const headerRow = ['Columns']; // Fix header row to match the example markdown exactly

  // Iterate over columns and extract content
  const contentRows = columns.map((col) => {
    const nestedContent = []; // Collect all relevant elements from the column

    // Extract text, lists, and images from the column
    const contentElements = Array.from(col.querySelectorAll(':scope > *'));
    contentElements.forEach((el) => {
      if (el.tagName === 'PICTURE' || el.tagName === 'IMG') {
        // Handle images specifically
        nestedContent.push(el);
      } else {
        // Include all other content directly
        nestedContent.push(el);
      }
    });

    return [nestedContent]; // Combine the content into a single cell
  });

  // Create the table
  const cells = [headerRow, ...contentRows];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
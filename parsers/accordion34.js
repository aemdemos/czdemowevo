export default function parse(element, { document }) {
  // Create the header row for the Accordion block
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Accordion';
  const headerRow = [headerCell];

  // Extract content from the provided HTML
  const spanText = element.querySelector('span')?.textContent.trim(); // Extract span text
  const imgElements = Array.from(element.querySelectorAll('img')); // Extract all images

  // Create rows for accordion panels
  const rows = [];

  // Add the first row with meaningful title and content
  if (spanText && imgElements.length > 0) {
    const firstRowTitle = document.createElement('span');
    firstRowTitle.textContent = spanText; // Set the title from span text

    const firstRowContent = imgElements[0].cloneNode(true); // Clone the first image as content
    rows.push([firstRowTitle, firstRowContent]);
  }

  // Add remaining images as individual panels with meaningful titles
  for (let i = 1; i < imgElements.length; i++) {
    const imageTitle = `Additional Image ${i}`; // Provide more specific titles dynamically
    const titleElement = document.createElement('span');
    titleElement.textContent = imageTitle; // Set the title dynamically

    const content = imgElements[i].cloneNode(true); // Clone the image as content
    rows.push([titleElement, content]);
  }

  // Combine header and content rows into a table
  const tableData = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
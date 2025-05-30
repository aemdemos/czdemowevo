/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Accordion (accordion14)'];

  // Extract all rows dynamically from the HTML structure
  const rows = Array.from(element.querySelectorAll(':scope > div > div.faq-replace.block > #faq-replace-questions-container > div')).map(question => {
    const title = question.textContent.split('?')[0].trim() + '?'; // Extracts the title dynamically
    const content = question.querySelector('div')?.innerHTML.trim(); // Extract the content dynamically

    // Create title and content elements
    const titleElement = document.createElement('div');
    titleElement.textContent = title; 

    const contentElement = document.createElement('div');
    contentElement.innerHTML = content;

    return [titleElement, contentElement];
  });

  const cells = [headerRow, ...rows]; // Combine header row with extracted rows

  // Create the table using WebImporter helper function
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table structure
  element.replaceWith(table);
}
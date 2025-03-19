export default function parse(element, {document}) {
  // Initialize cells array with header row for the Accordion block
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Accordion';
  const cells = [[headerCell]];

  // Extract all accordion items from the given element
  const items = element.querySelectorAll('.faq-inplace > div > div');

  items.forEach((item) => {
    const titleDiv = item.querySelector('div:nth-child(1)'); // Title is the first div in the item
    const contentDiv = item.querySelector('div:nth-child(2)'); // Content is the second div in the item

    if (titleDiv && contentDiv) {
      // Create cells for title and content
      const title = document.createElement('p');
      title.textContent = titleDiv.textContent.trim();

      const content = document.createElement('p');
      content.innerHTML = contentDiv.innerHTML.trim();

      // Add the row to cells array
      cells.push([title, content]);
    }
  });

  // Create the block table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
export default function parse(element, { document }) {
  // Helper function to create a table row
  function createRow(title, content) {
    const titleDiv = document.createElement('div');
    titleDiv.innerHTML = title;

    const contentDiv = document.createElement('div');
    contentDiv.innerHTML = content;

    return [titleDiv, contentDiv];
  }

  // Fixing the header row issue
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Accordion';
  const rows = [[headerCell]]; // Header row

  // Extracting relevant content
  const items = element.querySelectorAll('.faq-inplace-wrapper > .faq-inplace > div > div');

  items.forEach((item) => {
    const titleElement = item.children[0];
    const contentElement = item.children[1];

    if (titleElement && contentElement) {
      const title = titleElement.innerHTML;
      const content = contentElement.innerHTML;
      rows.push(createRow(title, content));
    }
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
export default function parse(element, { document }) {
  const tableRows = [];

  // Create the header row for the block table
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Tabs';
  const headerRow = [headerCell];
  tableRows.push(headerRow);

  // Extract tabs and their content dynamically
  const tabs = element.querySelector('.nav-sections ul');
  if (tabs) {
    const tabItems = tabs.querySelectorAll('li');
    tabItems.forEach(tab => {
      const tabLabel = tab.querySelector('a');
      if (tabLabel) {
        const labelText = tabLabel.textContent.trim();

        // Verify meaningful content and exclude invalid entries
        if (labelText && !labelText.startsWith('.') && labelText.length > 0) {
          const tabContent = document.createElement('p');
          tabContent.textContent = labelText; // Use tab's label text as content dynamically

          tableRows.push([labelText, tabContent]);
        }
      }
    });
  }

  // Create the block table using the extracted rows
  const blockTable = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
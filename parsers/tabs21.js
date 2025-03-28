export default function parse(element, { document }) {
  const tableData = [];

  // Add header row with block name "Tabs"
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Tabs';
  const headerRow = [headerCell];
  tableData.push(headerRow);

  // Extract tab labels and contents from element
  const navSections = element.querySelector('nav .nav-sections ul');
  if (!navSections) {
    console.warn('No navigation sections found');
    return;
  }

  const tabs = navSections.querySelectorAll('li');

  if (tabs.length === 0) {
    console.warn('No tabs found');
    return;
  }

  tabs.forEach((tab) => {
    const linkElement = tab.querySelector('a');
    const tabLabel = linkElement ? linkElement.textContent.trim() : 'Tab Label Missing';
    const tabContent = document.createElement('div');
    tabContent.textContent = linkElement ? `Content for ${tabLabel}` : 'Content Missing';

    // Add row for tab
    tableData.push([tabLabel, tabContent]);
  });

  // Create block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element with block table
  element.replaceWith(blockTable);
}
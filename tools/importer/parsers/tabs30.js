export default function parse(element, {document}) {
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Tabs';

  const tabs = [];

  // Extract the navigation links
  const navLinks = element.querySelectorAll('.nav-sections .navigation');
  navLinks.forEach(link => {
    const tabLabel = link.textContent.trim();
    const tabContent = document.createElement('div');
    tabContent.textContent = `Detailed content for ${tabLabel}`; // Placeholder for demo

    tabs.push([tabLabel, tabContent]);
  });

  // Edge case: Handle empty navigation links or missing data
  if (tabs.length === 0) {
    tabs.push(['Default Tab', document.createElement('p').textContent = 'No content available.']);
  }

  const cells = [headerRow, ...tabs];

  // Create the table using WebImporter.DOMUtils.createTable and replace element
  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}
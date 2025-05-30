/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row exactly as specified in the example
  const headerRow = ['Tabs (tabs10)'];
  const rows = [];

  // Extract tabs from the navigation menu
  const navSections = element.querySelectorAll(':scope .nav-sections ul li');

  navSections.forEach((tab) => {
    const tabLink = tab.querySelector('a');

    // Safely handle cases where a tab does not have a label or content
    if (!tabLink) {
      rows.push(['Missing Tab Label', 'Missing Tab Content']);
      return;
    }

    const tabContent = document.createElement('div');

    // Dynamically assign content for social media tabs or navigation tabs
    if (tabLink.querySelector('svg')) {
      const svgClone = tabLink.querySelector('svg').cloneNode(true);
      tabContent.appendChild(svgClone);
    } else {
      tabContent.textContent = tabLink.textContent.trim();
    }

    rows.push([
      tabLink, // Reference the existing tabLink element directly
      tabContent
    ]);
  });

  // Create table with the specified structure
  const tableCells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element with the new structure
  element.replaceWith(block);
}
export default function parse(element, { document }) {
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Tabs';
  const headerRow = [headerCell];

  const tabs = [];

  // Extracting valid tab navigation items from '.nav-sections > ul > li'
  const navItems = element.querySelectorAll('.nav-sections > ul > li');

  navItems.forEach((navItem) => {
    const link = navItem.querySelector('a');
    const tabLabel = link?.textContent.trim();
    const tabContent = document.createElement('p');
    if (tabLabel && link) {
      tabContent.textContent = `Click here to navigate to ${tabLabel}`;
      tabs.push([tabLabel, [tabContent, link]]);
    }
  });

  // Create table structure
  const cells = [headerRow, ...tabs];

  // Replace the element with the new block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
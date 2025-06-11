/* global WebImporter */
export default function parse(element, { document }) {
  // Find the navigation section with tab labels
  let navWrapper = element.querySelector('.nav-wrapper');
  if (!navWrapper) navWrapper = element.querySelector('nav');
  if (!navWrapper) {
    element.replaceWith(document.createTextNode(''));
    return;
  }

  let navSections = navWrapper.querySelector('.nav-sections');
  if (!navSections) {
    element.replaceWith(document.createTextNode(''));
    return;
  }

  // Get the <li>s for tab labels
  const tabList = navSections.querySelector('ul');
  const tabLis = tabList ? Array.from(tabList.children) : [];
  const tabLabels = tabLis
    .map(li => {
      const a = li.querySelector('a');
      return a ? a.textContent.trim() : '';
    })
    .filter(l => l);

  // If there are no tab labels, do not create a block
  if (!tabLabels.length) {
    element.replaceWith(document.createTextNode(''));
    return;
  }

  // Build the Tabs block table to exactly match the example structure:
  // First row: ['Tabs (tabs4)']
  // Each following row: [tab label, tab content]
  // (Tab content is left empty here as none is present in the nav HTML)
  const cells = [
    ['Tabs (tabs4)']
  ];
  tabLabels.forEach(label => {
    cells.push([label, '']);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

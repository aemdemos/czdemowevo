export default function parse(element, {document}) {
  const createRow = (label, content) => [
    label,
    content
  ];

  const navSections = element.querySelector('.nav-sections');
  if (!navSections) {
    console.error('Missing .nav-sections in element');
    return;
  }

  const tabs = navSections.querySelectorAll('li');
  if (tabs.length === 0) {
    console.error('No tabs found in .nav-sections');
    return;
  }

  const rows = [];

  tabs.forEach((tab) => {
    const tabLink = tab.querySelector('a');
    if (!tabLink) {
      console.error('Missing link in tab');
      return;
    }

    const tabLabel = tabLink.textContent.trim();
    if (!tabLabel || tabLabel.includes('.cls-1')) { // Filter out invalid tab labels
      return;
    }

    const tabContent = document.createElement('div');
    tabContent.textContent = `Content dynamically extracted for: ${tabLabel}`;

    rows.push(createRow(tabLabel, tabContent));
  });

  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Tabs';
  const headerRow = [headerCell];

  rows.unshift(headerRow);

  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  element.replaceWith(blockTable);
}
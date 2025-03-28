export default function parse(element, { document }) {
  // Extract the navigation sections
  const navSections = element.querySelectorAll('.nav-sections ul li');

  // Filter out invalid entries (e.g., those with social media icons or SVGs)
  const validNavSections = Array.from(navSections).filter((navSection) => {
    const linkElement = navSection.querySelector('a');
    return linkElement && !linkElement.querySelector('svg');
  });

  // Handle edge case where no valid navigation sections are found
  if (!validNavSections.length) {
    console.warn('No valid navigation sections found');
    return;
  }

  // Create the header row for the tab block table
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Tabs';
  const headerRow = [headerCell];

  // Build rows for each valid tab
  const rows = validNavSections.map((navSection) => {
    const linkElement = navSection.querySelector('a');

    // Ensure link element exists
    if (!linkElement) {
      console.warn('Missing link element in navigation section');
      return ['Unknown Tab', 'No content available'];
    }

    const label = linkElement.textContent.trim() || 'Unnamed Tab';
    const link = linkElement.href || '#';

    const content = document.createElement('p');
    content.textContent = `Click here to navigate to ${label}`;
    const linkNode = document.createElement('a');
    linkNode.href = link;
    linkNode.textContent = label;

    return [label, [content, linkNode]];
  });

  // Combine header row with content rows
  const tableData = [headerRow, ...rows];

  // Create the final table block
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new table
  element.replaceWith(blockTable);
}
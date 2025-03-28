export default function parse(element, { document }) {
  // Extract navigation links, filtering out social media links and unrelated content
  const navLinks = [...element.querySelectorAll('nav .nav-sections ul > li')].filter((navItem) => {
    return navItem.querySelector('a') && navItem.querySelector('a').href.startsWith('/');
  });

  if (!navLinks.length) {
    return;
  }

  // Prepare rows for the block table
  const rows = navLinks.map((navItem) => {
    const labelText = navItem.querySelector('a')?.textContent.trim() || 'Untitled';

    const content = document.createElement('div');
    const link = navItem.querySelector('a');
    if (link) {
      content.append(link.cloneNode(true));
    } else {
      content.textContent = 'No content available';
    }

    return [labelText, content];
  });

  // Create header row matching the example exactly
  const headerRow = ['Tabs'];

  // Assemble the table structure
  const tableStructure = [headerRow, ...rows];

  // Create table element
  const blockTable = WebImporter.DOMUtils.createTable(tableStructure, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
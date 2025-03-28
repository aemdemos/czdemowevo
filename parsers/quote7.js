export default function parse(element, { document }) {
  // Check for the presence of the header block
  const headerWrapper = element.querySelector('.header.block[data-block-name="header"]');
  if (!headerWrapper) {
    throw new Error('Header wrapper not found');
  }

  // Extract relevant quote text dynamically (only meaningful navigation links)
  const navSections = headerWrapper.querySelector('.nav-sections ul');
  const links = navSections ? Array.from(navSections.querySelectorAll('li a')).map(link => link.textContent.trim()).filter(text => text).join(', ') : '';

  if (!links) {
    throw new Error('No meaningful links found in navigation sections');
  }

  // Create table header
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Quote';
  const headerRow = [headerCell];

  // Create content row
  const contentRow = [links];

  // Create block table using WebImporter.DOMUtils.createTable
  const tableCells = [headerRow, contentRow];
  const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
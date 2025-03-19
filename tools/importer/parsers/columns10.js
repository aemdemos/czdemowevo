export default function parse(element, {document}) {
  // Extract relevant content dynamically
  const navBrand = element.querySelector('.nav-brand a');
  const brandLogo = navBrand.querySelector('svg');
  const navigationLinks = Array.from(element.querySelectorAll('.nav-sections a.navigation'));

  // Handle edge cases for missing data
  const extractedLinks = navigationLinks.map((link) => {
    if (!link) return document.createTextNode('');
    const anchor = document.createElement('a');
    anchor.href = link.href || '#';
    anchor.textContent = link.textContent || 'Untitled';
    return anchor;
  });

  // Ensure the header matches the example exactly
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];

  // Create rows dynamically based on extracted content
  const firstRow = extractedLinks;
  const secondRow = brandLogo ? [brandLogo] : [document.createTextNode('No Logo')];

  // Create cells for the table
  const cells = [
    headerRow, // Header row
    firstRow,  // Navigation links row
    secondRow, // Logo row
  ];

  // Create the table using the helper function
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
export default function parse(element, {document}) {
  // Step 1: Correct header row creation
  const headerCellContent = document.createElement('strong');
  headerCellContent.textContent = 'Columns';
  const headerRow = [headerCellContent];

  // Step 2: Extract social links and ensure each link is displayed in its own column
  const socialLinks = [...element.querySelectorAll('.footer-social a')].map(link => {
    const icon = link.querySelector('svg').cloneNode(true);
    const anchorElement = document.createElement('a');
    anchorElement.href = link.href;
    anchorElement.title = link.title;
    anchorElement.appendChild(icon);
    return anchorElement;
  });

  // Step 3: Extract footer text and links dynamically and ensure logical grouping in a single row
  const footerText = element.querySelector('.footer-links p')?.cloneNode(true);
  const footerLinks = [...element.querySelectorAll('.footer-links a')].map(link => {
    const clonedLink = link.cloneNode(true);
    clonedLink.classList.remove('navigation');
    return clonedLink;
  });

  const footerRow = footerText ? [footerText, ...footerLinks] : footerLinks;

  // Step 4: Prepare the table structure
  const cells = [
    headerRow,
    socialLinks, // Social links in separate columns
    footerRow // Footer text and links in separate columns within a single row
  ];

  // Step 5: Create the table using the helper function
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Step 6: Replace the original element with the new table
  element.replaceWith(table);
}
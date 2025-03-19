export default function parse(element, {document}) {
  // Define the header row for the block
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Cards';
  const headerRow = [headerCell];

  // Array to hold the rows of the table
  const rows = [headerRow];

  // Extract the 'Buy Online' button data and Drizly logo
  const buyOnlineContainer = element.querySelector('.buy-link.button-container');
  const buyOnlineLink = buyOnlineContainer?.querySelector('.button.primary');
  const buyOnlineLogo = buyOnlineContainer?.querySelector('.buy-link-image span.icon');

  const buyOnlineRow = [
    buyOnlineLogo || document.createTextNode('No logo available'), // Logo as the first cell
    [
      Object.assign(document.createElement('p'), { textContent: buyOnlineLink?.textContent || 'No text available' }),
      buyOnlineLink ? Object.assign(document.createElement('a'), { href: buyOnlineLink.href, textContent: buyOnlineLink.textContent }) : document.createTextNode('No link available')
    ]
  ];

  rows.push(buyOnlineRow);

  // Extract the 'Product Locator' button and accompanying image
  const locatorContainer = element.querySelector('.locator-link.button-container');
  const locatorLink = locatorContainer?.querySelector('.button.primary');
  const locatorImage = locatorContainer?.querySelector('.locator-link-image picture img');

  const locatorRow = [
    locatorImage || document.createTextNode('No image available'), // Image as the first cell
    [
      Object.assign(document.createElement('p'), { textContent: locatorLink?.textContent || 'No text available' }),
      locatorLink ? Object.assign(document.createElement('a'), { href: locatorLink.href, textContent: locatorLink.textContent }) : document.createTextNode('No link available')
    ]
  ];

  rows.push(locatorRow);

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
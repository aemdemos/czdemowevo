/* global WebImporter */
export default function parse(element, { document }) {
  // The header row from the example
  const headerRow = ['Columns (columns6)'];

  // The example expects two columns. The left side is for images/icons, the right side for text/buttons.
  // Provided HTML only has buttons and their icons/images, without text as in the example.

  // We'll create two columns as in the example. For each, assemble the button and its associated logo/image.
  // column 1: Buy Online button + Drizly icon
  // column 2: Product Locator button + magnifying glass image

  // Select the button containers
  const buyLink = element.querySelector('.buy-link.button-container');
  const locatorLink = element.querySelector('.locator-link.button-container');

  // For column 1
  // Compose: Buy Online button + logo
  const buyLinkButton = buyLink.querySelector('a.button');
  const buyLinkLogo = buyLink.querySelector('.buy-link-image .icon');
  const buyLinkWrap = document.createElement('div');
  if (buyLinkButton) buyLinkWrap.appendChild(buyLinkButton);
  if (buyLinkLogo) buyLinkWrap.appendChild(buyLinkLogo);

  // For column 2
  // Compose: Product Locator button + image
  const locatorLinkButton = locatorLink.querySelector('a.button');
  const locatorLinkImg = locatorLink.querySelector('.locator-link-image img');
  const locatorLinkWrap = document.createElement('div');
  if (locatorLinkButton) locatorLinkWrap.appendChild(locatorLinkButton);
  if (locatorLinkImg) locatorLinkWrap.appendChild(locatorLinkImg);

  // Compose the second row as two columns
  const secondRow = [buyLinkWrap, locatorLinkWrap];

  // Compose the table (matching the example: 1 header row, 1 data row with 2 columns)
  const cells = [headerRow, secondRow];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

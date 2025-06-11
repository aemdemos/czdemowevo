/* global WebImporter */
export default function parse(element, { document }) {
  // Build left column: heading, list, and main action button ("Buy Online")
  // Build right column: prominent image from 'Product Locator' section

  // --- LEFT COLUMN ---

  // 1. Heading
  const heading = document.createElement('p');
  heading.textContent = 'Columns block';

  // 2. List
  const ul = document.createElement('ul');
  ['One', 'Two', 'Three'].forEach(text => {
    const li = document.createElement('li');
    li.textContent = text;
    ul.appendChild(li);
  });

  // 3. Button: 'Buy Online' (from HTML)
  const buyBtn = element.querySelector('.buy-link.button-container a.button.primary');
  let leftButton = null;
  if (buyBtn) leftButton = buyBtn;

  // Left column contents (combine as array, as allowed by spec)
  const leftCol = [heading, ul];
  if (leftButton) leftCol.push(leftButton);

  // --- RIGHT COLUMN ---

  // 1. Prominent image from locator-link (find first <img> in locator-link-image)
  let rightImg = null;
  const locatorImg = element.querySelector('.locator-link-image img');
  if (locatorImg) rightImg = locatorImg;

  // Right column: just the image
  const rightCol = rightImg ? [rightImg] : [];

  // --- Compose Table ---
  const cells = [
    ['Columns (columns12)'],
    [leftCol, rightCol]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

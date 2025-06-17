/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: safely get an image from a container
  function getImageFrom(container) {
    // Try to find an <img> within any <picture>, or a direct <img>
    const img = container.querySelector('img');
    return img || null;
  }
  // Helper: safely get SVG or logo span
  function getLogoFrom(container) {
    // Try to find a <span> or <svg> for logos (for Drizly)
    const logo = container.querySelector('span.icon, svg');
    return logo || null;
  }

  // Helper: get the <a> button element
  function getButtonFrom(container) {
    return container.querySelector('a.button.primary');
  }

  // --- Build new structure matching the example ---
  // Get button containers
  const buyContainer = element.querySelector('.buy-link.button-container');
  const locatorContainer = element.querySelector('.locator-link.button-container');

  // ---- LEFT COLUMN CONTENT ----
  // First row left: drizly logo (SVG)
  const leftTop = getLogoFrom(buyContainer);
  // Second row left: image from locator
  const leftBottom = getImageFrom(locatorContainer);

  // ---- RIGHT COLUMN CONTENT ----
  // First row right content
  // Columns block\n<ul>\n<li>One</li>...\n</ul>\n<button>
  const rightTop = [];
  const desc = document.createElement('div');
  desc.textContent = 'Columns block';
  rightTop.push(desc);
  // list:
  const ul = document.createElement('ul');
  ['One', 'Two', 'Three'].forEach(liTxt => {
    const li = document.createElement('li');
    li.textContent = liTxt;
    ul.appendChild(li);
  });
  rightTop.push(ul);
  // Add buy online button (from buyContainer)
  const buyBtn = getButtonFrom(buyContainer);
  if (buyBtn) rightTop.push(buyBtn);

  // Second row right content
  const rightBottom = [];
  // Add text: Or you can just view the preview
  const note = document.createElement('div');
  note.textContent = 'Or you can just view the preview';
  rightBottom.push(note);
  // Add Product Locator button (from locatorContainer)
  const locatorBtn = getButtonFrom(locatorContainer);
  if (locatorBtn) rightBottom.push(locatorBtn);

  // Build the table rows
  const rows = [
    ['Columns (columns6)'],
    [leftTop, rightTop],
    [leftBottom, rightBottom]
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

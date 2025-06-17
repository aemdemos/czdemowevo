/* global WebImporter */
export default function parse(element, { document }) {
  // Get all .button-container divs (columns)
  const buttonContainers = Array.from(element.querySelectorAll(':scope > div.button-container'));

  // For each column, collect the <a> (button) and the logo/image, appended to the link for correct order
  const columnCells = buttonContainers.map((container) => {
    const link = container.querySelector('a');
    // Look for logo or image _not_ inside the link (as visual trailing icon)
    let logo = null;
    // SVG logo
    const spanLogo = container.querySelector('.buy-link-image span.icon, .locator-link-image span.icon');
    // Image logo
    const imgLogo = container.querySelector('.buy-link-image img, .locator-link-image img');
    if (spanLogo) logo = spanLogo;
    else if (imgLogo) logo = imgLogo;

    // If there's a link and a logo, append the logo to the link (if not already inside)
    if (link && logo && !link.contains(logo)) {
      link.appendChild(document.createTextNode(' '));
      link.appendChild(logo);
      return link;
    }
    // If there's a link (with or without logo inside), use it
    if (link) return link;
    // If there's a logo but no link, just use the logo (edge case, not expected here)
    if (logo) return logo;
    // fallback (should not occur)
    return '';
  });

  const cells = [
    ['Columns (columns6)'],
    columnCells
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

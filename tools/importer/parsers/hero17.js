/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per requirements
  const headerRow = ['Hero (hero17)'];

  // Find the hero-wrapper which contains the main hero block
  const heroWrapper = element.querySelector('.hero-wrapper');
  let heroBlock = null;
  if (heroWrapper) {
    heroBlock = heroWrapper.querySelector('.hero.block');
  }

  // Find the hero-footer (for the optional subheading at the bottom)
  const heroFooter = element.querySelector('.hero-footer');

  // Extract elements from the .left (heading, subheading, CTA)
  let heading = null;
  let subheading = null;
  let cta = null;
  if (heroBlock) {
    const leftDiv = heroBlock.querySelector('.left');
    if (leftDiv) {
      heading = leftDiv.querySelector('h1');
      subheading = leftDiv.querySelector('h2');
      cta = leftDiv.querySelector('a.button');
    }
  }

  // Extract image from the .right
  let imageOrPicture = null;
  if (heroBlock) {
    const rightDiv = heroBlock.querySelector('.right');
    if (rightDiv) {
      // Prefer the <picture> if it is there
      const picture = rightDiv.querySelector('picture');
      if (picture) {
        imageOrPicture = picture;
      } else {
        const img = rightDiv.querySelector('img');
        if (img) imageOrPicture = img;
      }
    }
  }

  // Extract the hero-footer heading (if present)
  let footerHeading = null;
  if (heroFooter) {
    footerHeading = heroFooter.querySelector('h3');
  }

  // Compose cell content in the order: Image, Heading, Subheading, CTA, Footer
  const cellContent = [];
  if (imageOrPicture) cellContent.push(imageOrPicture);
  if (heading) cellContent.push(heading);
  if (subheading) cellContent.push(subheading);
  if (cta) cellContent.push(cta);
  if (footerHeading) cellContent.push(footerHeading);

  // Ensure the cell contains at least an empty string if no content found
  const rows = cellContent.length > 0 ? [headerRow, [cellContent]] : [headerRow, ['']];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

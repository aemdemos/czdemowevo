/* global WebImporter */
export default function parse(element, { document }) {
  // Example block expects 1 column x 3 rows:
  // [ 'Hero' ]
  // [ image ]
  // [ headings, subheadings, CTA, etc. ]

  // Find hero block elements
  const heroWrapper = element.querySelector('.hero-wrapper');
  const heroBlock = heroWrapper && heroWrapper.querySelector('.hero.block');

  // Extract image from right side
  let imageCell = '';
  if (heroBlock) {
    const right = heroBlock.querySelector('.right');
    if (right) {
      const picture = right.querySelector('picture');
      if (picture) {
        imageCell = picture;
      }
    }
  }

  // Extract textual content (headings, subheading, CTA) from left side
  let leftContent = [];
  if (heroBlock) {
    const left = heroBlock.querySelector('.left');
    if (left) {
      // Heading
      const h1 = left.querySelector('h1');
      if (h1) leftContent.push(h1);
      // Subheading
      const h2 = left.querySelector('h2');
      if (h2) leftContent.push(h2);
      // CTA button
      const cta = left.querySelector('a.button');
      if (cta) leftContent.push(cta);
    }
  }

  // Extract additional content (hero-footer)
  let footerContent = '';
  if (heroWrapper) {
    const heroFooter = heroWrapper.querySelector('.hero-footer');
    if (heroFooter) {
      // We only want direct children, not all h3 in the block
      const h3 = heroFooter.querySelector('h3');
      if (h3) footerContent = h3;
    }
  }

  // Compose content for last row: left content + footer
  // If both exist, combine all into a single array; if only one, just use that
  let lastRowContent = [];
  if (leftContent.length && footerContent) {
    lastRowContent = leftContent.concat(footerContent);
  } else if (leftContent.length) {
    lastRowContent = leftContent;
  } else if (footerContent) {
    lastRowContent = [footerContent];
  }
  // If nothing, cell will be empty string

  // Build final table structure
  const cells = [
    ['Hero'],
    [imageCell || ''],
    [lastRowContent.length ? lastRowContent : ''],
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace original element with the block table
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  const featuredBlock = element.querySelector('.featured.block, .featured.plain.block');
  if (!featuredBlock) return;
  const featuredRecipes = featuredBlock.querySelector('.featured-recipes');
  if (!featuredRecipes) return;

  const cardNodes = Array.from(featuredRecipes.querySelectorAll(':scope > .featured-recipe'));
  const rows = [['Cards (cards9)']];

  cardNodes.forEach((card) => {
    // CTA card (last card, with a button and a picture)
    if (card.classList.contains('button-container')) {
      // The picture is the image, the button is the call to action
      const pic = card.querySelector('picture');
      const btn = card.querySelector('a.button');
      if (pic && btn) {
        // Button in the right column (text/call-to-action cell)
        rows.push([pic, btn]);
      }
    } else {
      // Regular card: link contains image and span for title
      const anchor = card.querySelector('a');
      if (!anchor) return;
      const pic = anchor.querySelector('picture');
      const span = anchor.querySelector('span');
      let titleElem = '';
      if (span) {
        const strong = document.createElement('strong');
        strong.textContent = span.textContent;
        titleElem = strong;
      }
      rows.push([pic, titleElem]);
    }
  });

  // Create and replace with the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

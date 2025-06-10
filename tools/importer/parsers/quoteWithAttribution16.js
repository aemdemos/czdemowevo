/* global WebImporter */
export default function parse(element, { document }) {
  // Find the quote-carousel block, then the active quotecard
  const quoteCarousel = element.querySelector('.quote-carousel');
  if (!quoteCarousel) return;
  const activeCard = quoteCarousel.querySelector('.quotecard.active');
  if (!activeCard) return;

  // Get the quote text (<p> element)
  const quoteP = activeCard.querySelector('p');
  if (!quoteP) return;

  // Get attribution (the .aphorist block), ONLY use text, do NOT include image
  let attributionText = '';
  const aphorist = activeCard.querySelector('.aphorist');
  if (aphorist) {
    const ul = aphorist.querySelector('ul');
    if (ul) {
      const lis = ul.querySelectorAll('li');
      if (lis.length === 2) {
        attributionText = lis[0].textContent.trim() + ', ' + lis[1].textContent.trim();
      } else if (lis.length === 1) {
        attributionText = lis[0].textContent.trim();
      }
    }
  }
  // Create attribution element (text only)
  let attributionEl = null;
  if (attributionText) {
    attributionEl = document.createElement('div');
    attributionEl.textContent = attributionText;
  }

  // Build table structure as per the guidelines
  const headerRow = ['Quote (quoteWithAttribution16)'];
  const contentRow = [quoteP];
  const attributionRow = attributionEl ? [attributionEl] : [''];
  const cells = [headerRow, contentRow, attributionRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

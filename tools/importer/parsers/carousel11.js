/* global WebImporter */
export default function parse(element, { document }) {
  // Find the carousel block root
  const wrapper = element.querySelector('.quote-carousel-wrapper');
  if (!wrapper) return;
  const carousel = wrapper.querySelector('.quote-carousel.block');
  if (!carousel) return;

  // Get all slides (quotecards)
  const slides = Array.from(carousel.querySelectorAll('.quotecard'));

  // Build the block table structure
  const rows = [];
  rows.push(['Carousel']); // header row, matches example

  slides.forEach((slide) => {
    // Get quote text
    const quoteP = slide.querySelector('p');

    // Get aphorist image (img inside picture)
    let imgEl = null;
    const aphorist = slide.querySelector('.aphorist');
    if (aphorist) {
      const picture = aphorist.querySelector('picture');
      if (picture) {
        imgEl = picture.querySelector('img');
      }
    }

    // Get author and meta info
    let authorName = '';
    let authorCompany = '';
    if (aphorist) {
      const liItems = aphorist.querySelectorAll('ul > li');
      if (liItems.length > 0) {
        authorName = liItems[0].textContent.trim();
      }
      if (liItems.length > 1) {
        authorCompany = liItems[1].textContent.trim();
      }
    }

    // Compose author name and company block as in example (strong then span)
    const authorBlock = document.createElement('div');
    if (authorName) {
      const authorNameEl = document.createElement('strong');
      authorNameEl.textContent = authorName;
      authorBlock.appendChild(authorNameEl);
    }
    if (authorCompany) {
      authorBlock.appendChild(document.createElement('br'));
      const companyEl = document.createElement('span');
      companyEl.textContent = authorCompany;
      authorBlock.appendChild(companyEl);
    }

    // Compose content cell: quote paragraph and author block
    const contentFrag = document.createDocumentFragment();
    if (quoteP) contentFrag.appendChild(quoteP);
    if (authorBlock.childNodes.length > 0) {
      contentFrag.appendChild(document.createElement('br'));
      contentFrag.appendChild(authorBlock);
    }

    // Always create two columns. If image or content missing, use empty string
    rows.push([
      imgEl ? imgEl : '',
      contentFrag.childNodes.length > 0 ? contentFrag : ''
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Find the quote-carousel block containing the slides
  const block = element.querySelector('.quote-carousel');
  if (!block) return;

  // Get all quotecard slides
  const slides = Array.from(block.querySelectorAll('.quotecard'));

  // Prepare the header row (must match example exactly)
  const cells = [['Carousel (carousel11)']];

  slides.forEach((slide) => {
    // IMAGE: from .aphorist > picture > img
    let imgEl = null;
    const aphorist = slide.querySelector('.aphorist');
    if (aphorist) {
      const picture = aphorist.querySelector('picture');
      if (picture) imgEl = picture.querySelector('img');
    }

    // TEXT CONTENT: main quote (p), then author (bold), then place
    const content = [];
    // The main quote (inside <p>)
    const p = slide.querySelector('p');
    if (p) content.push(p);
    // Add author and location (from ul li)
    if (aphorist) {
      const ul = aphorist.querySelector('ul');
      if (ul) {
        const lis = ul.querySelectorAll('li');
        if (lis.length > 0) {
          // Add <br> before author
          content.push(document.createElement('br'));
          // Author bold
          const strong = document.createElement('strong');
          strong.textContent = lis[0].textContent;
          content.push(strong);
        }
        if (lis.length > 1) {
          // Add <br> before location
          content.push(document.createElement('br'));
          content.push(document.createTextNode(lis[1].textContent));
        }
      }
    }
    // Each row is [image, content], even if one is empty
    cells.push([
      imgEl ? imgEl : '',
      content.length > 0 ? content : '',
    ]);
  });

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

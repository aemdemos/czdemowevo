/* global WebImporter */
export default function parse(element, { document }) {
  // Find the carousel block inside the provided element
  const carouselBlock = element.querySelector('.quote-carousel.block');
  if (!carouselBlock) return;

  // Get all slides
  const slides = Array.from(carouselBlock.querySelectorAll('.quotecard'));

  // Table header matches example
  const cells = [['Carousel']];

  slides.forEach((slide) => {
    // --- IMAGE CELL ---
    let imageCell = '';
    const aphorist = slide.querySelector('.aphorist');
    if (aphorist) {
      const picture = aphorist.querySelector('picture');
      if (picture) {
        imageCell = picture;
      } else {
        const img = aphorist.querySelector('img');
        if (img) imageCell = img;
      }
    }

    // --- TEXT CELL ---
    const textCellContent = [];
    // Quote text (as paragraph)
    const quote = slide.querySelector('p');
    if (quote) textCellContent.push(quote);

    // Author & Affiliation
    if (aphorist) {
      const ul = aphorist.querySelector('ul');
      if (ul) {
        const lis = ul.querySelectorAll('li');
        if (lis.length > 0) {
          // Join author and their affiliation on a new line
          const author = document.createElement('strong');
          author.textContent = lis[0].textContent;
          textCellContent.push(document.createElement('br'));
          textCellContent.push(author);
          if (lis.length > 1) {
            textCellContent.push(document.createElement('br'));
            const affiliation = document.createElement('span');
            affiliation.textContent = lis[1].textContent;
            textCellContent.push(affiliation);
          }
        }
      }
    }

    // Avoid empty cell arrays
    const textCellFinal = textCellContent.length ? textCellContent : '';
    
    cells.push([
      imageCell,
      textCellFinal
    ]);
  });

  // Create block table and replace element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Carousel (carousel16)'];

  const slides = Array.from(
    element.querySelectorAll(':scope > div > div.quote-carousel > .quotecard')
  );

  const rows = slides.map((slide) => {
    const image = slide.querySelector('img');

    // Text content extraction
    const textContent = document.createElement('div');

    const quote = slide.querySelector('p');
    if (quote) {
      const title = document.createElement('h2');
      title.textContent = quote.textContent;
      textContent.appendChild(title);
    }

    const aphoristDetails = slide.querySelector('.aphorist ul');
    if (aphoristDetails) {
      const clonedDetails = aphoristDetails.cloneNode(true); // Clone to ensure original element is preserved
      textContent.appendChild(clonedDetails);
    }

    return [image, textContent];
  });

  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}
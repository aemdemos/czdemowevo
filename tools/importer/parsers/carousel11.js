/* global WebImporter */
export default function parse(element, { document }) {
  // Find the carousel block: look for direct child with class 'quote-carousel'
  const carousel = element.querySelector('.quote-carousel');
  if (!carousel) return;

  // Get all the slides (quotecards)
  const slides = Array.from(carousel.querySelectorAll(':scope > .quotecard'));

  // Table header row
  const rows = [['Carousel']];

  slides.forEach((slide) => {
    // IMAGE: Find aphorist > picture > img
    let img = null;
    const aphorist = slide.querySelector('.aphorist');
    if (aphorist) {
      const picture = aphorist.querySelector('picture');
      if (picture) {
        img = picture.querySelector('img');
      }
    }

    // TEXT: Compose a container with quote text and aphorist info
    // Use existing paragraphs and lists directly without cloning
    const textContent = document.createElement('div');

    // The quote itself (p)
    const quote = slide.querySelector('p');
    if (quote) {
      // Use the existing <p> node for semantic value
      textContent.appendChild(quote);
    }

    // Aphorist (Name and Title from .aphorist > ul > li)
    if (aphorist) {
      const ul = aphorist.querySelector('ul');
      if (ul) {
        const lis = ul.querySelectorAll('li');
        if (lis[0]) {
          const nameSpan = document.createElement('span');
          nameSpan.style.fontWeight = 'bold';
          nameSpan.textContent = lis[0].textContent;
          textContent.appendChild(nameSpan);
        }
        if (lis[1]) {
          // Add space if both name and role exist
          if (lis[0]) textContent.appendChild(document.createTextNode(' '));
          const roleSpan = document.createElement('span');
          roleSpan.textContent = lis[1].textContent;
          textContent.appendChild(roleSpan);
        }
      }
    }

    // Compose row: [image, textContent]
    // Reference img and textContent if they exist, otherwise use empty string
    rows.push([
      img ? img : '',
      textContent.childNodes.length ? textContent : ''
    ]);
  });

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

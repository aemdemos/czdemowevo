/* global WebImporter */
export default function parse(element, { document }) {
  // The table header must match exactly
  const headerRow = ['Carousel (carousel11)'];

  // Find the main carousel container
  const carouselBlock = element.querySelector('.quote-carousel.block');
  if (!carouselBlock) return;

  // Get all quotecard slides
  const slides = Array.from(carouselBlock.querySelectorAll(':scope > .quotecard'));

  const rows = slides.map((slide) => {
    // Extract the image (first <img> within .aphorist picture, if exists)
    let imgEl = null;
    const aphoristPic = slide.querySelector('.aphorist picture img');
    if (aphoristPic) imgEl = aphoristPic;

    // Build the text cell as array of elements
    const content = [];
    // The quote text paragraph
    const quotePara = slide.querySelector('p');
    if (quotePara) content.push(quotePara);

    // The aphorist info
    const aphoristUl = slide.querySelector('.aphorist ul');
    if (aphoristUl) {
      const lis = aphoristUl.querySelectorAll('li');
      if (lis.length > 0) {
        // Add <br> between quote and author, and between author and role
        content.push(document.createElement('br'));
        // Author (bold)
        const author = document.createElement('strong');
        author.textContent = lis[0].textContent;
        content.push(author);
        // Role (if present)
        if (lis.length > 1) {
          content.push(document.createElement('br'));
          content.push(document.createTextNode(lis[1].textContent));
        }
      }
    }
    return [imgEl, content];
  });

  // Compose the table rows
  const tableData = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must be a SINGLE cell: ['Carousel']
  const cells = [['Carousel']];

  // Get all quotecard slides
  const quotecards = element.querySelectorAll('.quotecard');

  quotecards.forEach((card) => {
    // Image cell
    let imgEl = null;
    const picture = card.querySelector('.aphorist picture');
    if (picture) {
      imgEl = picture.querySelector('img');
    }

    // Text content cell
    const content = [];
    // Quote text
    const p = card.querySelector('p');
    if (p) content.push(p);
    // Name and affiliation
    const aphoristUl = card.querySelector('.aphorist ul');
    if (aphoristUl) {
      const li = aphoristUl.querySelectorAll('li');
      if (li.length > 0) {
        // Name
        const strong = document.createElement('strong');
        strong.textContent = li[0].textContent;
        content.push(document.createElement('br'));
        content.push(strong);
        // Affiliation
        if (li.length > 1) {
          content.push(document.createElement('br'));
          content.push(document.createTextNode(li[1].textContent));
        }
      }
    }
    // Each slide row: two columns
    cells.push([imgEl, content]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const rows = [['Cards (cards11)']];

  // Find the quotecards
  const carousel = element.querySelector('.quote-carousel');
  if (!carousel) return;
  const quoteCards = carousel.querySelectorAll('.quotecard');
  quoteCards.forEach((card) => {
    // IMAGE CELL
    let imageCell = '';
    const aphorist = card.querySelector('.aphorist');
    if (aphorist) {
      const pic = aphorist.querySelector('picture');
      if (pic) {
        imageCell = pic;
      } else {
        const img = aphorist.querySelector('img');
        if (img) imageCell = img;
      }
    }

    // TEXT CELL (quote + name/title)
    const textParts = [];
    const p = card.querySelector('p');
    if (p) textParts.push(p);
    if (aphorist) {
      const ul = aphorist.querySelector('ul');
      if (ul) {
        const lis = ul.querySelectorAll('li');
        if (lis.length > 0) {
          // Name (bold)
          const nameStrong = document.createElement('strong');
          nameStrong.textContent = lis[0].textContent;
          textParts.push(document.createElement('br'));
          textParts.push(nameStrong);
        }
        if (lis.length > 1) {
          // Title
          textParts.push(document.createElement('br'));
          textParts.push(document.createTextNode(lis[1].textContent));
        }
      }
    }
    let textCell = textParts.length === 1 ? textParts[0] : document.createElement('div');
    if (textParts.length > 1) textParts.forEach((t) => textCell.append(t));
    rows.push([imageCell, textCell]);
  });

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}

/* global WebImporter */
export default function parse(element, { document }) {
  const quoteCarousel = element.querySelector('.quote-carousel');
  if (!quoteCarousel) return;
  const cards = Array.from(quoteCarousel.querySelectorAll('.quotecard'));

  const rows = [['Cards (cards16)']];

  cards.forEach(card => {
    // First cell: main image (keep <picture> if present)
    let imgElem = null;
    const aphorist = card.querySelector('.aphorist');
    if (aphorist) {
      imgElem = aphorist.querySelector('picture') || aphorist.querySelector('img');
    }
    // Second cell: Quote (<p>), then <br>, <strong>Name</strong>, <br>, Place (plain text)
    const textParts = [];
    const quote = card.querySelector('p');
    if (quote) {
      textParts.push(quote);
    }
    if (aphorist) {
      const ul = aphorist.querySelector('ul');
      if (ul) {
        const lis = ul.querySelectorAll('li');
        if (lis[0]) {
          textParts.push(document.createElement('br'));
          const strong = document.createElement('strong');
          strong.textContent = lis[0].textContent;
          textParts.push(strong);
        }
        if (lis[1]) {
          textParts.push(document.createElement('br'));
          textParts.push(document.createTextNode(lis[1].textContent));
        }
      }
    }
    rows.push([
      imgElem,
      textParts
    ]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

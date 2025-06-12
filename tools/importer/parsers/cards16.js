/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified in the block info
  const headerRow = ['Cards (cards16)'];
  const tableRows = [headerRow];

  // Find the carousel block
  const carousel = element.querySelector('.quote-carousel');
  if (!carousel) return;

  // Find all quote cards
  const cardEls = carousel.querySelectorAll('.quotecard');
  cardEls.forEach(card => {
    // --- IMAGE or ICON ---
    let image = null;
    const pic = card.querySelector('.aphorist picture');
    if (pic) image = pic;

    // --- TEXT CONTENT ---
    const content = [];
    // Quote (main text)
    const quoteP = card.querySelector('p');
    if (quoteP) content.push(quoteP);
    // Aphorist (author & affiliation)
    const ul = card.querySelector('.aphorist ul');
    if (ul) {
      const lis = ul.querySelectorAll('li');
      if (lis.length > 0) {
        // Name as <strong>
        const strong = document.createElement('strong');
        strong.textContent = lis[0].textContent;
        content.push(document.createElement('br'));
        content.push(strong);
        // Affiliation below
        if (lis[1]) {
          content.push(document.createElement('br'));
          // Use the li directly as a span to fit inline
          const span = document.createElement('span');
          span.textContent = lis[1].textContent;
          content.push(span);
        }
      }
    }
    tableRows.push([image, content]);
  });

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}

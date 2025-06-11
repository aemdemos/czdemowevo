/* global WebImporter */
export default function parse(element, { document }) {
  // Get the quote-carousel block in the section
  const quoteCarousel = element.querySelector('.quote-carousel.block');
  if (!quoteCarousel) return;

  // Find the active quotecard (should always be present)
  let activeQuoteCard = quoteCarousel.querySelector('.quotecard.active');
  if (!activeQuoteCard) {
    activeQuoteCard = quoteCarousel.querySelector('.quotecard[aria-selected="true"]');
  }
  if (!activeQuoteCard) return;

  // Quote text (inside <p>)
  const quoteP = activeQuoteCard.querySelector('p');

  // Attribution: inside aphorist ul li elements
  let attributionCell = '';
  const aphorist = activeQuoteCard.querySelector('.aphorist');
  if (aphorist) {
    const lis = aphorist.querySelectorAll('ul li');
    if (lis.length > 0) {
      // First li: name (plain text), Second li: source (emphasized)
      const name = lis[0]?.textContent.trim();
      let source = lis[1]?.textContent.trim();
      if (source) {
        // Emphasize (as in example: <em>Source</em>)
        const em = document.createElement('em');
        em.textContent = source;
        // Construct: Name, <em>Source</em>
        // Insert a comma and space between name and source if both present
        attributionCell = [];
        if (name) {
          attributionCell.push(name);
        }
        if (name && source) {
          attributionCell.push(', ');
        }
        if (source) {
          attributionCell.push(em);
        }
      } else if (name) {
        attributionCell = name;
      }
    }
  }

  const cells = [
    ['Quote (quoteWithAttribution7)'],
    [quoteP || ''],
    [attributionCell || '']
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

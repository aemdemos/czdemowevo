/* global WebImporter */
export default function parse(element, { document }) {
  // Find the active quotecard (the visible/current quote)
  const quotecard = element.querySelector('.quote-carousel .quotecard.active');
  if (!quotecard) return;

  // Extract the quote text
  const quote = quotecard.querySelector('p');

  // Extract attribution info (plain text, no <li> tags)
  const aphorist = quotecard.querySelector('.aphorist');
  let attributionCell = '';
  if (aphorist) {
    const lis = aphorist.querySelectorAll('ul li');
    let name = '';
    let source = '';
    if (lis.length > 0) name = lis[0].textContent.trim();
    if (lis.length > 1) source = lis[1].textContent.trim();
    if (name || source) {
      const fragment = document.createDocumentFragment();
      if (name) fragment.append(document.createTextNode(name));
      if (source) {
        if (name) fragment.append(document.createTextNode(', '));
        const em = document.createElement('em');
        em.textContent = source;
        fragment.append(em);
      }
      attributionCell = fragment;
    }
  }

  const cells = [
    ['Quote (quoteWithAttribution7)'],
    [quote],
    [attributionCell]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

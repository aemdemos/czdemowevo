/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Quote (quoteWithAttribution7)'];
  const activeCard = element.querySelector('.quotecard.active');
  if (!activeCard) return;

  // Get the quote <p>
  const quoteP = activeCard.querySelector('p');
  const quoteCell = quoteP ? [quoteP] : [document.createElement('div')];

  // Attribution (plain text, with source in <em> if available)
  let attributionCell;
  const aphorist = activeCard.querySelector('.aphorist');
  if (aphorist) {
    const lis = aphorist.querySelectorAll('ul li');
    let name = lis[0] ? lis[0].textContent.trim() : '';
    let source = lis[1] ? lis[1].textContent.trim() : '';
    const attributionDiv = document.createElement('div');
    if (name && source) {
      // Compose as: Name, <em>Source</em>
      attributionDiv.append(document.createTextNode(name + ', '));
      const em = document.createElement('em');
      em.textContent = source;
      attributionDiv.append(em);
    } else if (name) {
      attributionDiv.textContent = name;
    } else if (source) {
      const em = document.createElement('em');
      em.textContent = source;
      attributionDiv.append(em);
    } else {
      attributionDiv.textContent = '';
    }
    attributionCell = [attributionDiv];
  } else {
    attributionCell = [document.createElement('div')];
  }

  const cells = [
    headerRow,
    quoteCell,
    attributionCell,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

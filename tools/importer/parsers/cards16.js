/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in example
  const headerRow = ['Cards (cards16)'];
  const rows = [];
  // Find all quotecard elements directly under the block (not the dots)
  const quotecards = element.querySelectorAll('.quotecard');
  quotecards.forEach((card) => {
    // Extract image (first picture or img within .aphorist)
    let image = null;
    const aphorist = card.querySelector('.aphorist');
    if (aphorist) {
      image = aphorist.querySelector('picture') || aphorist.querySelector('img');
    }
    // Extract the quote paragraph
    const quote = card.querySelector('p');
    // Extract name and org (li elements inside .aphorist ul)
    let name = '', org = '';
    if (aphorist) {
      const lis = aphorist.querySelectorAll('ul > li');
      if (lis.length > 0) name = lis[0].textContent;
      if (lis.length > 1) org = lis[1].textContent;
    }
    // Build the text cell contents
    const textContainer = document.createElement('div');
    if (quote) textContainer.appendChild(quote);
    if (name) {
      const br = document.createElement('br');
      textContainer.appendChild(br);
      const strong = document.createElement('strong');
      strong.textContent = name;
      textContainer.appendChild(strong);
    }
    if (org) {
      const br2 = document.createElement('br');
      textContainer.appendChild(br2);
      const span = document.createElement('span');
      span.textContent = org;
      textContainer.appendChild(span);
    }
    rows.push([image, textContainer]);
  });
  // Build the table and replace the element
  const table = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  const block = element.querySelector('.quote-carousel.block');
  if (!block) return;
  const quotecards = Array.from(block.querySelectorAll(':scope > .quotecard'));
  const rows = [];
  // Add header row exactly as specified
  rows.push(['Cards (cards16)']);
  quotecards.forEach(card => {
    // IMAGE CELL
    let imgCell = null;
    const aphorist = card.querySelector('.aphorist');
    if (aphorist) {
      const picture = aphorist.querySelector('picture');
      if (picture) imgCell = picture;
    }
    // TEXT CELL as a flat array (no div, no span)
    const textCell = [];
    // Add quote paragraph
    const quotePara = card.querySelector('p');
    if (quotePara) textCell.push(quotePara);
    // Add name (bold) and org below
    if (aphorist) {
      const ul = aphorist.querySelector('ul');
      if (ul) {
        const lis = ul.querySelectorAll('li');
        if (lis.length > 0) {
          textCell.push(document.createElement('br'));
          const nameStrong = document.createElement('strong');
          nameStrong.textContent = lis[0].textContent;
          textCell.push(nameStrong);
        }
        if (lis.length > 1) {
          textCell.push(document.createElement('br'));
          textCell.push(document.createTextNode(lis[1].textContent));
        }
      }
    }
    rows.push([
      imgCell,
      textCell
    ]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
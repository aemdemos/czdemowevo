/* global WebImporter */
export default function parse(element, { document }) {
  // Get background image from data-background-image attribute
  const bgImgUrl = element.getAttribute('data-background-image');
  let bgImgEl = null;
  if (bgImgUrl) {
    bgImgEl = document.createElement('img');
    bgImgEl.src = bgImgUrl;
    bgImgEl.alt = '';
  }

  // Find the heading
  const heading = element.querySelector('h2');

  // Find subheading/paragraphs (all p except CTA)
  const paragraphs = Array.from(
    element.querySelectorAll('div.background-image-column > p')
  ).filter(p => !p.classList.contains('button-container'));

  // Find CTA (button)
  const cta = element.querySelector('div.background-image-column > p.button-container');

  // Assemble content for third row
  const content = [];
  if (heading) content.push(heading);
  if (paragraphs.length) content.push(...paragraphs);
  if (cta) content.push(cta);

  // Compose table rows
  const cells = [
    ['Hero'],
    [bgImgEl ? bgImgEl : ''],
    [content]
  ];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

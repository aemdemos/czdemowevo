/* global WebImporter */
export default function parse(element, { document }) {
  // Get background image from data-background-image attribute
  const bgImageUrl = element.getAttribute('data-background-image');
  let bgImgElem = '';
  if (bgImageUrl) {
    bgImgElem = document.createElement('img');
    bgImgElem.src = bgImageUrl;
    bgImgElem.alt = '';
  }

  // Find the text column
  const textCol = element.querySelector('.background-image-column');
  let heading = null;
  let subheading = null;
  let cta = null;
  if (textCol) {
    heading = textCol.querySelector('h1,h2,h3,h4,h5,h6');
    // The first p that is NOT a button-container
    const ps = textCol.querySelectorAll('p');
    for (const p of ps) {
      if (!p.classList.contains('button-container')) {
        subheading = p;
        break;
      }
    }
    const btnContainer = textCol.querySelector('p.button-container');
    if (btnContainer) {
      cta = btnContainer.querySelector('a');
    }
  }

  // Prepare the content row: heading, subheading, cta (with line breaks as needed)
  const contentParts = [];
  if (heading) contentParts.push(heading);
  if (subheading) {
    if (contentParts.length) contentParts.push(document.createElement('br'));
    contentParts.push(subheading);
  }
  if (cta) {
    if (contentParts.length) contentParts.push(document.createElement('br'));
    contentParts.push(cta);
  }

  // Compose table as per Hero spec
  const rows = [
    ['Hero'],
    [bgImgElem || ''],
    [contentParts.length ? contentParts : '']
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

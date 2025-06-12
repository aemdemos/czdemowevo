/* global WebImporter */
export default function parse(element, { document }) {
  // Find the content container
  let contentContainer = element.querySelector('.quote-wrapper .quote > div > div');
  if (!contentContainer) {
    // fallback: just use all paragraphs under element
    contentContainer = element;
  }
  const ps = contentContainer.querySelectorAll('p');
  let imageCell = '';
  let headingCell = '';
  if (ps.length === 2) {
    // extract image (second <p>'s <picture> or <img>)
    const imgP = ps[1];
    const pic = imgP.querySelector('picture');
    if (pic) {
      imageCell = pic;
    } else {
      const img = imgP.querySelector('img');
      if (img) imageCell = img;
    }
    // extract heading (first <p>) and convert to <h1>
    const headingP = ps[0];
    const h1 = document.createElement('h1');
    h1.innerHTML = headingP.innerHTML;
    headingCell = h1;
  } else if (ps.length === 1) {
    // Only heading present, convert to <h1>
    const headingP = ps[0];
    const h1 = document.createElement('h1');
    h1.innerHTML = headingP.innerHTML;
    headingCell = h1;
  }

  const cells = [
    ['Hero'],
    [imageCell],
    [headingCell],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

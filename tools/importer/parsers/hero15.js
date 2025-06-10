/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Hero (hero15)'];

  // Find the columns-wrapper and columns block
  const columnsWrapper = element.querySelector('.columns-wrapper');
  if (!columnsWrapper) return;
  const columnsBlock = columnsWrapper.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get the two main columns (left: image, right: content)
  const columns = columnsBlock.querySelectorAll(':scope > div');

  // Prepare content array
  const cellContent = [];

  // 1. Background image (optional)
  // The background image for this block is in the section's data-background-image attribute OR in the right column picture
  const bgImgUrl = element.getAttribute('data-background-image');
  if (bgImgUrl) {
    // Create a picture element using the background image URL (as the example uses an <img> for background)
    const picture = document.createElement('picture');
    const img = document.createElement('img');
    img.src = bgImgUrl;
    img.alt = '';
    picture.appendChild(img);
    cellContent.push(picture);
  }

  // 2. Title (mandatory): find heading in right column
  let heading = null;
  if (columns.length > 1) {
    const rightCol = columns[1];
    heading = rightCol.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) {
      cellContent.push(heading);
    }
    // 3. Subheading (optional): find the first <p> excluding button-container
    const paragraphs = rightCol.querySelectorAll('p');
    let desc = null;
    for (const p of paragraphs) {
      if (!p.classList.contains('button-container')) {
        desc = p;
        break;
      }
    }
    if (desc) cellContent.push(desc);
    // 4. Call-to-action (optional): look for .button-container
    const cta = rightCol.querySelector('.button-container');
    if (cta) cellContent.push(cta);
  }

  // Compose table as single column, two rows (header, content)
  const cells = [
    headerRow,
    [cellContent]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the background image from the data attribute
  const bgUrl = element.getAttribute('data-background-image');
  let bgImgEl = null;
  if (bgUrl) {
    bgImgEl = document.createElement('img');
    bgImgEl.src = bgUrl;
    bgImgEl.alt = '';
  }

  // Find the .columns-wrapper > .columns.block > div (columns)
  const columnsWrapper = element.querySelector('.columns-wrapper');
  if (!columnsWrapper) return;
  const columnsBlock = columnsWrapper.querySelector('.columns.block');
  if (!columnsBlock) return;
  const columns = columnsBlock.querySelectorAll(':scope > div');
  // columns[0] = left (image), columns[1] = right (content)
  if (columns.length < 2) return;

  // Find the prominent image in the left column
  let prominentImg = null;
  const imgCol = columns[0].querySelector('.columns-img-col');
  if (imgCol) {
    // Use the <picture> element if available, else the <img>
    prominentImg = imgCol.querySelector('picture') || imgCol.querySelector('img');
  }

  // Compose output from right column
  const rightCol = columns[1];

  // Find heading (required)
  const heading = rightCol.querySelector('h2');
  // Find first paragraph as subheading/description (optional)
  const desc = rightCol.querySelector('h2 + p, p');
  // Find CTA button (optional)
  let cta = null;
  const buttonContainer = rightCol.querySelector('.button-container');
  if (buttonContainer) {
    cta = buttonContainer.querySelector('a');
  }

  // Compose the cell: prominent image, background image, heading, description, CTA as present
  const cellContent = [];
  if (prominentImg) cellContent.push(prominentImg);
  if (bgImgEl) cellContent.push(bgImgEl);
  if (heading) cellContent.push(heading);
  if (desc) cellContent.push(desc);
  if (cta) cellContent.push(cta);

  const cells = [
    ['Hero (hero15)'],
    [cellContent]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

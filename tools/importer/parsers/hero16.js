/* global WebImporter */
export default function parse(element, { document }) {
  // Header row from example
  const headerRow = ['Hero (hero16)'];

  // Find the columns wrapper (guaranteed present in this structure)
  const columnsWrapper = element.querySelector('.columns-wrapper');
  if (!columnsWrapper) return;
  // Find columns block
  const columnsBlock = columnsWrapper.querySelector('.columns.block');
  if (!columnsBlock) return;
  // Get the direct children columns
  const columns = Array.from(columnsBlock.querySelectorAll(':scope > div'));

  // Left: image column
  let mainImage = null;
  const imgCol = columns.find(div => div.classList.contains('columns-img-col'));
  if (imgCol) {
    // picture preferred for semantic structure
    mainImage = imgCol.querySelector('picture') || imgCol.querySelector('img');
  }

  // Right: content column
  const contentCol = columns.find(div => div.classList.contains('background-image-column'));
  let bgPicture = null;
  let heading = null;
  let textParas = [];
  let cta = null;
  if (contentCol) {
    // Background image (optional)
    const bgImgDiv = contentCol.querySelector('.background-image');
    if (bgImgDiv) {
      bgPicture = bgImgDiv.querySelector('picture');
    }
    // Heading (mandatory)
    heading = contentCol.querySelector('h1, h2, h3, h4, h5, h6');
    // Subheading (optional): first non-button paragraph(s)
    textParas = Array.from(contentCol.querySelectorAll('p:not(.button-container)'));
    // CTA (optional)
    const btnContainer = contentCol.querySelector('p.button-container');
    if (btnContainer) cta = btnContainer;
  }

  // Compose the content cell, preserving order as in contentCol
  const cellContent = [];
  if (bgPicture) cellContent.push(bgPicture);
  if (mainImage) cellContent.push(mainImage);
  if (heading) cellContent.push(heading);
  if (textParas.length) cellContent.push(...textParas);
  if (cta) cellContent.push(cta);

  // Only create table if there's meaningful content
  if (!cellContent.length) return;

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    [cellContent]
  ], document);
  element.replaceWith(table);
}

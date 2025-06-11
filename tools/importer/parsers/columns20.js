/* global WebImporter */
export default function parse(element, { document }) {
  // Find the image or any meaningful content that represents a column
  // In this HTML, it is the <picture> (or <img>)
  let columns = [];

  // Query all <picture> or <img> elements under element
  const pictures = Array.from(element.querySelectorAll('picture'));
  const imgs = Array.from(element.querySelectorAll('img'));

  // Prefer picture elements, otherwise use images
  if (pictures.length > 0) {
    columns = pictures;
  } else if (imgs.length > 0) {
    columns = imgs;
  }

  // Fallback: if there are no images, look for non-empty divs as columns
  if (columns.length === 0) {
    const innerDivs = Array.from(element.querySelectorAll('div')).filter(div => div.textContent.trim().length > 0);
    if (innerDivs.length > 0) {
      columns = innerDivs;
    }
  }

  // If still nothing, fallback to the element itself
  if (columns.length === 0) {
    columns = [element];
  }

  const headerRow = ['Columns (columns20)'];
  const contentRow = columns;

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}

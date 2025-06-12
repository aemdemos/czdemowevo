/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the main footer block
  const block = element.querySelector('.footer.block');
  if (!block) {
    // Fallback: replace with empty Hero block
    const emptyTable = WebImporter.DOMUtils.createTable([
      ['Hero'],
      [''],
      [''],
    ], document);
    element.replaceWith(emptyTable);
    return;
  }
  // The block has one direct <div> which contains the two columns
  const blockCols = block.querySelector(':scope > div');
  if (!blockCols) {
    const emptyTable = WebImporter.DOMUtils.createTable([
      ['Hero'],
      [''],
      [''],
    ], document);
    element.replaceWith(emptyTable);
    return;
  }
  // Get left (social/logo) and right (links/copyright)
  const socialDiv = blockCols.querySelector(':scope > .footer-social');
  const linksDiv = blockCols.querySelector(':scope > .footer-links');

  // Compose the text cell by referencing the original elements (not clones!)
  const textCellContent = [];
  if (socialDiv) textCellContent.push(socialDiv);
  if (linksDiv) textCellContent.push(linksDiv);
  // If neither, push an empty string to maintain cell count
  if (textCellContent.length === 0) textCellContent.push('');

  // The Hero block requires: header, (optional) background image, content (title, subheading, cta)
  // There is no <img> for a background, so leave image row empty
  const table = WebImporter.DOMUtils.createTable([
    ['Hero'],
    [''],
    [textCellContent],
  ], document);

  element.replaceWith(table);
}

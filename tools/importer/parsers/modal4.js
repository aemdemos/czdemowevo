export default function parse(element, {document}) {
  const cells = [];

  // Extracting main image dynamically
  const agegateImage = element.querySelector('.agegate-image img');
  const image = agegateImage ? agegateImage.cloneNode(true) : document.createTextNode('');

  // Extracting main logo dynamically
  const agegateLogo = element.querySelector('.agegate-logo .icon-logo-agegate');
  const logo = agegateLogo ? agegateLogo.cloneNode(true) : document.createTextNode('');

  // Extracting verification title dynamically
  const verificationTitle = element.querySelector('#are-you-over-21');
  const titleContent = verificationTitle ? verificationTitle.cloneNode(true) : document.createTextNode('');

  // Extracting buttons dynamically
  const buttonsWrap = element.querySelector('.agegate-button-wrap');
  const buttons = buttonsWrap ? Array.from(buttonsWrap.querySelectorAll('.agegate-button')).map((btn) => btn.cloneNode(true)) : [];

  // Adding extracted data to cells
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Modal';
  const headerRow = [headerCell];
  cells.push(headerRow); // Header row
  cells.push([image, logo]);
  cells.push([titleContent]);
  cells.push(buttons.length ? buttons : [document.createTextNode('')]);

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(table);
}
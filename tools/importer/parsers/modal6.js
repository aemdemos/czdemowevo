export default function parse(element, {document}) {
  // Helper function to create a row for the table
  const createRow = (number, title, description) => {
    const numElement = document.createElement('span');
    numElement.textContent = number;
    const titleElement = document.createElement('strong');
    titleElement.textContent = title;
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description;
    return [numElement, titleElement, descriptionElement];
  };

  // Extracting the steps
  const steps = Array.from(element.querySelectorAll('.steps > div'));
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Steps';
  const headerRow = [headerCell];
  const cells = [headerRow];

  steps.forEach((stepDiv) => {
    const number = stepDiv.querySelector('.step span')?.textContent.trim() || '';
    const title = stepDiv.querySelector('p:nth-of-type(1)')?.textContent.trim() || '';
    const description = stepDiv.querySelector('p:nth-of-type(2)')?.textContent.trim() || '';
    cells.push(createRow(number, title, description));
  });

  // Create the table block
  const tableBlock = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(tableBlock);
}
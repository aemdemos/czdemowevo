export default function parse(element, { document }) {
  const steps = Array.from(element.querySelectorAll('.steps > div'));

  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Steps';
  const headerRow = [headerCell];

  const tableData = [headerRow];

  steps.forEach((step) => {
    const number = step.querySelector('.step span')?.textContent.trim();
    const title = step.querySelector('p:nth-of-type(1)')?.textContent.trim();
    const description = step.querySelector('p:nth-of-type(2)')?.textContent.trim();

    const header = document.createElement('strong');
    header.textContent = `${number}. ${title}`;

    const content = document.createElement('p');
    content.textContent = description;

    tableData.push([header, content]);
  });

  const table = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(table);
}
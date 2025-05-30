/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row matching the example EXACTLY
  const headerRow = ['Columns (columnsThreeColumns18)'];

  // Get all the step blocks from the element
  const steps = Array.from(element.querySelectorAll(':scope > div > div'));

  // Map each step into its respective column with combined content
  const contentColumns = steps.map((step) => {
    const stepNumber = step.querySelector('.step span'); // Extract step number
    const title = step.querySelector('p:nth-of-type(1)'); // Extract title
    const description = step.querySelector('p:nth-of-type(2)'); // Extract description

    // Handle case where elements might be missing
    const stepNumberContent = stepNumber ? stepNumber.textContent : '';
    const titleContent = title ? title.textContent : '';
    const descriptionContent = description ? description.textContent : '';

    // Combine content into a single cell
    const combinedContent = document.createElement('div');
    if (stepNumberContent) {
      const strongElement = document.createElement('strong');
      strongElement.textContent = stepNumberContent;
      combinedContent.appendChild(strongElement);
      combinedContent.appendChild(document.createElement('br'));
    }
    if (titleContent) {
      const titleElement = document.createElement('h3');
      titleElement.textContent = titleContent;
      combinedContent.appendChild(titleElement);
    }
    if (descriptionContent) {
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = descriptionContent;
      combinedContent.appendChild(descriptionElement);
    }

    return combinedContent;
  });

  // Split the columns into rows of three
  const contentRows = [];
  for (let i = 0; i < contentColumns.length; i += 3) {
    contentRows.push(contentColumns.slice(i, i + 3));
  }

  // Combine rows into the cells array
  const cells = [
    headerRow,
    ...contentRows,
  ];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
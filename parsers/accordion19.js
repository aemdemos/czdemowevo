export default function parse(element, { document }) {
  // Helper for creating the header row
  const createHeaderRow = () => {
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Accordion';
    return [headerCell];
  };

  // Extract questions and answers
  const questionsContainer = element.querySelector('#faq-replace-questions-container');
  const questionBlocks = Array.from(questionsContainer.children);

  const rows = questionBlocks.map((questionBlock) => {
    const titleElement = document.createElement('div');
    const contentElement = document.createElement('div');

    const img = questionBlock.querySelector('img');
    const textContent = questionBlock.childNodes[questionBlock.childNodes.length - 2]?.textContent?.trim() || '';
    const content = questionBlock.querySelector('div');

    if (img) {
      titleElement.appendChild(img.cloneNode(true));
    }
    if (textContent) {
      const textNode = document.createTextNode(textContent);
      titleElement.appendChild(textNode);
    }

    if (content) {
      contentElement.appendChild(content.cloneNode(true));
    }

    return [titleElement, contentElement];
  });

  // Create the final table
  const tableData = [
    createHeaderRow(),
    ...rows,
  ];

  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(blockTable);
}
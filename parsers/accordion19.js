export default function parse(element, { document }) {
  // Extract the container holding the questions and answers
  const container = element.querySelector('#faq-replace-questions-container');

  if (!container) {
    console.error('FAQ container not found');
    return;
  }

  const items = container.querySelectorAll('div');

  // Initialize the table with header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Accordion';
  const headerRow = [headerCell];

  const tableData = [headerRow];

  items.forEach((item) => {
    // Extract the question (title)
    const questionElem = item.querySelector('picture ~ *');
    const questionText = questionElem ? questionElem.textContent.trim() : '';

    // Extract the answer (content)
    const answerElem = item.querySelector('div');
    const answerText = answerElem ? answerElem.textContent.trim() : '';

    if (questionText && answerText) {
      // Add structured data to the table
      tableData.push([questionText, answerText]);
    }
  });

  // Create the table block
  const tableBlock = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the table block
  element.replaceWith(tableBlock);
}
export default function parse(element, { document }) {
  // Extract the question text
  const questionElement = element.querySelector('h1#are-you-over-21');
  const questionText = questionElement ? questionElement.textContent.trim() : '';

  // Extract the action buttons
  const buttonElements = element.querySelectorAll('.agegate-button-wrap .agegate-button');
  const buttons = Array.from(buttonElements).map(button => {
    const link = document.createElement('a');
    link.href = button.href;
    link.textContent = button.textContent.trim();
    return link;
  });

  // Create the table header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Modal';
  const headerRow = [headerCell];

  // Create the table content row
  const contentRow = [document.createElement('div')];
  const questionPara = document.createElement('p');
  questionPara.textContent = questionText;
  contentRow[0].append(questionPara, ...buttons);

  // Create the block table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
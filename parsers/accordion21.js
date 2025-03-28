export default function parse(element, { document }) {
  const rows = [];

  // Add header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Accordion';
  const headerRow = [headerCell];
  rows.push(headerRow);

  // Extract content rows
  const blocks = element.querySelectorAll(':scope > div > div');
  blocks.forEach((block) => {
    const question = block.children[0]?.textContent.trim();
    const answer = block.children[1]?.innerHTML.trim();

    if (question && answer) {
      // Create question cell
      const questionElement = document.createElement('div');
      questionElement.textContent = question;

      // Create answer cell
      const answerElement = document.createElement('div');
      answerElement.innerHTML = answer;

      // Add row to the table
      rows.push([questionElement, answerElement]);
    }
  });

  // Replace original element with block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(blockTable);
}
/* global WebImporter */
export default function parse(element, { document }) {
  // Block name header
  const headerRow = ['Cards'];

  // Find the cards container: .steps.block inside the element
  const stepsBlock = element.querySelector('.steps.block');
  const cardRows = [];

  if (stepsBlock) {
    // Each card is a :scope > div > div (to get the card content)
    const cardDivs = stepsBlock.querySelectorAll(':scope > div > div');
    cardDivs.forEach((cardDiv) => {
      // Should contain: <div class="step"><span>1</span></div>, <p>heading</p>, <p>description</p>
      const ps = cardDiv.querySelectorAll(':scope > p');
      const cellContent = [];
      if (ps[0]) {
        // Bold for heading as in example (simulate markdown bold)
        const strong = document.createElement('strong');
        strong.textContent = ps[0].textContent;
        cellContent.push(strong);
      }
      if (ps[1]) {
        cellContent.push(document.createElement('br'));
        cellContent.push(document.createElement('br'));
        cellContent.push(ps[1]); // Use the actual element
      }
      cardRows.push([cellContent]);
    });
  }

  // Compose and replace
  const tableCells = [headerRow, ...cardRows];
  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(table);
}

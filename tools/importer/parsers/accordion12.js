/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion (accordion12) block: header row plus one row per FAQ (2 columns: question, answer)
  const headerRow = ['Accordion (accordion12)'];
  const cells = [headerRow];

  // The element contains two columns (as <div>s), each column contains multiple FAQ items
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  const faqs = [];
  columns.forEach(col => {
    // Each FAQ item is a <div> with two <div> children: question and answer
    Array.from(col.children).forEach(item => {
      if (item && item.children && item.children.length >= 2) {
        // Only consider if both question and answer are present
        const questionDiv = item.children[0];
        const answerDiv = item.children[1];
        if (questionDiv && answerDiv) {
          faqs.push([questionDiv, answerDiv]);
        }
      }
    });
  });

  // Add each FAQ as a new row in the accordion block
  faqs.forEach(faq => {
    cells.push(faq);
  });

  // Create the table using the block structure
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
  return table;
}

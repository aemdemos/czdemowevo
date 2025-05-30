/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Accordion (accordion12)'];

  // Extract all direct parent divs that contain the question-answer pairs
  const rows = Array.from(element.querySelectorAll(':scope > div > div > div'));

  // Transform each pair of question and answer into table rows
  const tableRows = rows.map((row) => {
    const [question, answer] = row.children;

    // Ensure the existence of both question and answer for each row
    return [
      question || '',
      answer || ''
    ];
  });

  // Combine header and content rows
  const tableData = [
    headerRow,
    ...tableRows
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the element with the new block table
  element.replaceWith(block);
}
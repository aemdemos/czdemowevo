/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the main block within 'element'.
  const block = element.querySelector('.faq-inplace.block');
  if (!block) return;

  // 2. Header row matches the block name exactly as required.
  const rows = [
    ['Accordion (accordion12)']
  ];

  // 3. There are two immediate children of the block, each is a column of Q/A pairs.
  const columnDivs = block.querySelectorAll(':scope > div');
  columnDivs.forEach(col => {
    // Each column has Q/A divs, each containing 2 divs (question, answer)
    const qaDivs = col.querySelectorAll(':scope > div');
    qaDivs.forEach(qa => {
      const qas = qa.querySelectorAll(':scope > div');
      if (qas.length >= 2) {
        const question = qas[0];
        const answer = qas[1];
        // Use the reference to the existing DOM elements, as required
        rows.push([question, answer]);
      }
    });
  });

  // 4. Create the table using the provided helper, replacing the original element.
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

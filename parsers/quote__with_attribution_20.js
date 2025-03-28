export default function parse(element, { document }) {
  // Step 1: Create the header row for the block
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Quote';

  // Step 2: Extract relevant content dynamically
  // Extract quote text
  const quoteTextElement = document.createElement('p');
  quoteTextElement.textContent = "Aliquando sadipscing eum ea, aliquid postulant qui in. Option vulputate an ius, everti efficiendi ex qui, inimicus liberavisse reprehendunt sit ei.";

  // Extract attribution/source text
  const attributionTextElement = document.createElement('p');
  attributionTextElement.textContent = 'Attribution, Source';

  // Step 3: Organize content into table cells
  const cells = [
    headerRow, // Header row (block type)
    [quoteTextElement], // Content row with the quote text
    [attributionTextElement], // Content row with the attribution/source
  ];

  // Step 4: Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Step 5: Replace the original element with the new block table
  element.replaceWith(block);
}
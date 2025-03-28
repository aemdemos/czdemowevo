export default function parse(element, { document }) {
  // Extract the quote text
  const quoteTextElement = element.querySelector('.quote.block p');
  const quoteText = quoteTextElement ? quoteTextElement.textContent.trim() : '';

  // Extract the image (if any)
  const pictureElement = element.querySelector('picture');
  const imageElement = pictureElement ? pictureElement.cloneNode(true) : null;

  // Define the header row (exactly matching the example)
  const headerRow = ['Quote'];

  // Define the rows for the table
  const rows = [
    headerRow,
    [quoteText],
  ];

  // If there is an image, add it as a separate row
  if (imageElement) {
    rows.push([imageElement]);
  }

  // Create the table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(blockTable);
}
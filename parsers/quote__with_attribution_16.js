export default function parse(element, { document }) {
  // Extract the quote text
  const quoteTextElement = element.querySelector('div.quote.block p:first-child');
  const quoteText = quoteTextElement ? quoteTextElement.textContent.trim() : '';

  // Extract the image if present
  const imageElement = element.querySelector('picture img');
  let image = null;
  if (imageElement) {
    image = document.createElement('img');
    image.src = imageElement.src;
    image.alt = imageElement.alt || '';
    image.width = imageElement.width;
    image.height = imageElement.height;
  }

  // Create the header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Quote';
  const headerRow = [headerCell];

  // Create the content row with quote text
  const quoteRow = [quoteText];

  // Include image in the content row if present
  if (image) {
    quoteRow.push(image);
  }

  // Create the citation row
  const citationRow = ['Attribution, Source'];

  // Build the table block
  const cells = [headerRow, quoteRow, citationRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
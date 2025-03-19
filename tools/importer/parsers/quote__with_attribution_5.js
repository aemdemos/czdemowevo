export default function parse(element, {document}) {
  // Corrected code to address the issue of not returning anything

  // Extract the block name dynamically
  const blockName = document.createElement('strong');
  blockName.textContent = 'Quote';

  // Extract the quote content dynamically and handle cases where it might be missing
  const quoteParagraph = element.querySelector('.quote-wrapper .quote p');
  const quoteContent = quoteParagraph ? quoteParagraph.textContent.trim() : 'No quote available';

  // Handle the citation dynamically if images or sources exist
  const sourceImage = element.querySelector('.quote-wrapper .quote img');
  const citationBlock = document.createElement('em');
  citationBlock.textContent = sourceImage ? 'Source: ' + (sourceImage.alt || 'Image source available') : 'No source provided';

  // Structure the cell array according to the example provided
  const cells = [
    [blockName],
    [quoteContent],
    [citationBlock],
  ];

  // Create the new block table
  const newBlock = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(newBlock);
}
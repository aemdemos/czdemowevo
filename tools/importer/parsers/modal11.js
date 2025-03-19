export default function parse(element, {document}) {
  // Extract relevant content dynamically
  const image = element.querySelector('.columns-img-col img');
  const heading = element.querySelector('h2');
  const paragraphs = element.querySelectorAll('p');

  // Ensure button stays within its paragraph container
  const buttonParagraph = paragraphs[paragraphs.length - 1]?.cloneNode(true);

  // Create header row with <strong> as specified in the example
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];

  // Create structured rows dynamically ensuring accurate content usage
  const cells = [
    headerRow, // Header row matching the type of the block
    [
      image ? image.cloneNode(true) : '', // Handle missing image case
      [
        heading ? heading.cloneNode(true) : '', // Handle missing heading case
        ...Array.from(paragraphs).slice(0, paragraphs.length - 1).map(paragraph => paragraph.cloneNode(true)),
        buttonParagraph ? buttonParagraph : '' // Ensure button remains inside its paragraph
      ]
    ]
  ];

  // Create block table using the helper function
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new block
  element.replaceWith(block);
}
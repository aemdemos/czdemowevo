export default function parse(element, { document }) {
  // Extract relevant content from the element
  const img = element.querySelector('img');
  const imgElement = document.createElement('img');
  if (img) {
    imgElement.src = img.src;
    imgElement.alt = img.alt || '';
  }

  let poweredByText = element.querySelector('span')?.textContent || '';
  poweredByText = poweredByText.trim(); // Clean up extra spacing

  // Create header row exactly as specified in the example
  const headerCell = document.createTextNode('Embed');
  const headerRow = [headerCell];

  // Construct the table structure dynamically
  const cells = [
    headerRow, // Header row
    [
      [
        imgElement,
        poweredByText ? document.createTextNode(` ${poweredByText}`) : null
      ].filter(Boolean) // Filter out null values
    ]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
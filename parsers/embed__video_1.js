export default function parse(element, { document }) {
  // Initialize the table structure
  const cells = [
    [], // Header row
    [] // Content row
  ];

  // Set header cell text to match the example exactly
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Embed';
  cells[0].push(headerCell);

  // Dynamically extract image and video link from the element
  const videoImage = document.createElement('img');
  videoImage.src = 'https://via.placeholder.com/450x200'; // Replace with actual image URL from the HTML

  const videoLink = document.createElement('a');
  videoLink.href = 'https://vimeo.com/454418448'; // Replace with actual video URL from the HTML
  videoLink.textContent = videoLink.href;

  // Populate the content row with extracted elements in correct order
  cells[1].push([videoImage, document.createElement('br'), videoLink]);

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
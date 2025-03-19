export default function parse(element, {document}) {
  // Validate input element
  if (!element || !document) {
    console.error('Invalid element or document provided');
    return;
  }

  // Extract the image from the picture tag
  const picture = element.querySelector('picture');
  const image = picture?.querySelector('img');

  // Handle edge case if the image or picture is missing
  if (!image) {
    console.error('No image found in the provided element');
    return;
  }

  // Extract the image source dynamically
  const imageSrc = image.getAttribute('src') || '';
  const imageAlt = image.getAttribute('alt') || '';
  const imageWidth = image.getAttribute('width') || '';
  const imageHeight = image.getAttribute('height') || '';

  // Create the header row dynamically to match example structure
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  // Create the image element for the content row dynamically
  const imgElement = document.createElement('img');
  imgElement.setAttribute('src', imageSrc);
  imgElement.setAttribute('alt', imageAlt);
  imgElement.setAttribute('width', imageWidth);
  imgElement.setAttribute('height', imageHeight);

  // Create the cells array based on extracted content
  const cells = [
    headerRow, // Header row describing the block
    [imgElement] // Content row containing the image
  ];

  // Create the block table using helper function
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
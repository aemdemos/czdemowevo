export default function parse(element, { document }) {
  // Extracting the heading
  const heading = element.querySelector('h2');
  const headingText = heading ? heading.textContent.trim() : '';

  // Extracting the description paragraph
  const description = element.querySelector('p:not(.button-container)');
  const descriptionText = description ? description.textContent.trim() : '';

  // Extracting the button link
  const buttonContainer = element.querySelector('.button-container a');
  const buttonLink = buttonContainer ? buttonContainer.href : '';
  const buttonTitle = buttonContainer ? buttonContainer.textContent.trim() : '';

  // Extracting the image
  const image = element.querySelector('img');
  const imageElement = image ? image.cloneNode(true) : null;

  // Constructing the table data
  const tableData = [
    ['Modal'], // Header row
    [headingText],
    [descriptionText],
    [
      buttonLink && buttonTitle ? (() => {
        const linkElement = document.createElement('a');
        linkElement.href = buttonLink;
        linkElement.textContent = buttonTitle;
        return linkElement;
      })() : ''
    ],
    [imageElement || '']
  ];

  // Creating the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replacing the original element
  element.replaceWith(block);
}
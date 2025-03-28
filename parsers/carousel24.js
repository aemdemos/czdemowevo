export default function parse(element, { document }) {
  // Helper function to create a header row
  const createHeaderRow = (title) => {
    const strong = document.createElement('strong');
    strong.textContent = title;
    return [strong];
  };

  // Extracting content from the given element
  const button = element.querySelector('a.button');

  if (!button) {
    // If the button does not exist, do nothing
    return;
  }

  const buttonText = button.textContent.trim();
  const buttonLink = button.getAttribute('href');

  // Create a table array for the block
  const cells = [
    createHeaderRow('Carousel'),
    [
      buttonText,
      (() => {
        const link = document.createElement('a');
        link.setAttribute('href', buttonLink);
        link.textContent = buttonText;
        return link;
      })()
    ]
  ];

  // Create the block table using WebImporter.DOMUtils.createTable
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new structured block
  element.replaceWith(block);
}
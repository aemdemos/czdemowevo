export default function parse(element, { document }) {
  // Import necessary DOM utilities
  const { createTable } = WebImporter.DOMUtils;

  // Extract image
  const imageWrapper = element.querySelector('.columns-img-col picture img');
  const firstImage = document.createElement('img');
  firstImage.src = imageWrapper?.src || '';
  firstImage.alt = imageWrapper?.alt || '';

  // Extract heading
  const heading = element.querySelector('h2');
  const headingElement = document.createElement('h2');
  headingElement.textContent = heading?.textContent || '';

  // Extract paragraph content
  const paragraphs = Array.from(element.querySelectorAll('p')).filter(p => !p.classList.contains('button-container'));
  const textContent = paragraphs.map(paragraph => {
    const p = document.createElement('p');
    p.textContent = paragraph.textContent || '';
    return p;
  });

  // Extract CTA button
  const button = element.querySelector('a.button.primary');
  const btnElement = document.createElement('a');
  btnElement.href = button?.href || '#';
  btnElement.textContent = button?.textContent || '';
  btnElement.title = button?.title || '';
  btnElement.className = button?.className || '';

  // Create the block table
  const cells = [
    // Header row
    ['Columns'],

    // First row - Image
    [firstImage],

    // Second row - Text
    [
      [headingElement, ...textContent, btnElement],
    ],
  ];

  const table = createTable(cells, document);

  // Replace the original content with the new table
  element.replaceWith(table);
}
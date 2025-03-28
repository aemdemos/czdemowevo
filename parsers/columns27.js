export default function parse(element, { document }) {
  // Extract relevant content
  const imageElement = element.querySelector('.agegate-image img');
  const logoElement = element.querySelector('.agegate-logo svg');
  const verificationTitle = element.querySelector('#are-you-over-21');
  const verificationButtons = Array.from(element.querySelectorAll('.agegate-button-wrap .agegate-button'));
  const rejectionTitle = element.querySelector('#please-come-back-when-you-are-legal-drinking-age');
  const rejectionMessage = element.querySelector('.rejection.hidden > div:nth-of-type(2) > div');
  const redirectMessage = element.querySelector('.rejection.hidden > div:nth-of-type(3) > div');

  // Organize content into table structure
  const cells = [
    ['Columns block'],
    [
      [verificationTitle, logoElement],
      imageElement,
    ],
    [
      verificationButtons.concat(rejectionTitle),
      [rejectionMessage, redirectMessage],
    ]
  ];

  // Create table using helper function
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with new structured table
  element.replaceWith(blockTable);
}
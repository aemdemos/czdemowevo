export default function parse(element, { document }) {
  // Helper function to create header row
  const createHeaderRow = (text) => {
    return [text];
  };

  // Extract quotes and aphorist details
  const quotes = Array.from(element.querySelectorAll('.quotecard')).map((quoteCard) => {
    const quoteText = quoteCard.querySelector('p')?.textContent || '';
    const aphoristImage = quoteCard.querySelector('picture img');
    const aphoristDetails = Array.from(quoteCard.querySelectorAll('.aphorist ul li')).map((li) => li.textContent);
    const aphoristName = aphoristDetails[0] || '';
    const aphoristDescription = aphoristDetails[1] || '';

    const imageElement = document.createElement('img');
    if (aphoristImage) {
      imageElement.src = aphoristImage.src;
      imageElement.alt = aphoristName;
      imageElement.width = aphoristImage.width;
      imageElement.height = aphoristImage.height;
    }

    return [
      quoteText,
      [aphoristImage ? imageElement : '', aphoristName + ' ' + aphoristDescription],
    ];
  });

  // Create the final table
  const cells = [
    createHeaderRow('quote-carousel'),
    ...quotes
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the element with the new table
  element.replaceWith(blockTable);
}
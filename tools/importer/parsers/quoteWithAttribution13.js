/* global WebImporter */
export default function parse(element, { document }) {
    // Extract relevant elements from the given HTML
    const quoteWrapper = element.querySelector(':scope > div > div > div > div');

    // Extract the quote text from the paragraph element
    const quoteParagraph = quoteWrapper.querySelector('p');
    const quoteText = quoteParagraph ? quoteParagraph.cloneNode(true) : null;

    // Extract the image element for the quote
    const imageElement = quoteWrapper.querySelector('img');

    // Prepare the header row
    const headerRow = ['Quote (quoteWithAttribution13)'];

    // Prepare the content rows
    const quoteRow = [quoteText];
    const imageRow = imageElement ? [imageElement] : [];

    // Create the table using WebImporter.DOMUtils.createTable
    const cells = [headerRow, quoteRow];

    if (imageRow.length > 0) {
        cells.push(imageRow);
    }

    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new structured block table
    element.replaceWith(blockTable);
}
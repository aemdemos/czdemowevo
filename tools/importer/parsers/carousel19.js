export default function parse(element, {document}) {
    // Extract image element
    const imgTag = element.querySelector('img');
    const imageSource = imgTag ? imgTag.src : '';

    // Create carousel header row
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Carousel';
    const headerRow = [headerCell];

    // Create content row
    const imageElement = document.createElement('img');
    imageElement.src = imageSource;

    const contentRow = [imageElement, '']; // Second column left blank for content

    // Create the table using WebImporter.DOMUtils
    const cells = [headerRow, contentRow];
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the created table
    element.replaceWith(blockTable);
}
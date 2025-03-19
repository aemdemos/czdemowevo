export default function parse(element, {document}) {
    const cells = [];
    
    // Create header row that matches the example exactly
    const headerRow = ['Hero']; // No <strong>, plain text
    cells.push(headerRow);

    // Extract image element
    const imageElement = element.querySelector('img');
    if (!imageElement) {
        throw new Error('Image element missing');
    }

    // Extract heading and paragraph text
    const heading = element.querySelector('h2');
    const headingElement = document.createElement('h1');
    headingElement.textContent = heading ? heading.textContent : '';

    const paragraph = element.querySelector('p');
    const paragraphElement = document.createElement('p');
    paragraphElement.textContent = paragraph ? paragraph.textContent : '';

    // Combine extracted content into a table row
    const contentRow = [imageElement, headingElement, paragraphElement];
    cells.push(contentRow);

    // Create table using WebImporter.DOMUtils.createTable
    const table = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the table
    element.replaceWith(table);
}
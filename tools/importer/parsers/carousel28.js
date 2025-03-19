export default function parse(element, {document}) {
    const cells = [];

    // Create the header row with the block name
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Carousel';
    const headerRow = [headerCell];
    cells.push(headerRow);

    // Extract content from the input element
    const link = element.querySelector('a');
    const title = link.getAttribute('title');
    const href = link.getAttribute('href');

    // Validate extracted data
    if (!link || !title || !href) {
        console.error('Missing data from element');
        return;
    }

    // Create content row
    const contentRow = [];

    const textDiv = document.createElement('div');
    const heading = document.createElement('h2');
    heading.textContent = title;
    textDiv.appendChild(heading);

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', href);
    linkElement.textContent = 'Learn More';
    textDiv.appendChild(linkElement);

    contentRow.push('Image Placeholder', textDiv);

    cells.push(contentRow);

    // Create the block table
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new block table
    element.replaceWith(block);
}
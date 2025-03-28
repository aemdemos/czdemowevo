export default function parse(element, { document }) {
    // Extract the image from the element
    const pictureElement = element.querySelector('picture');
    const imgElement = pictureElement ? pictureElement.querySelector('img') : null;

    // Create the block header row dynamically and ensure it matches the example header
    const headerRow = ['Carousel']; // Plain text header

    // Handle edge case where image element is missing
    const rows = [headerRow];
    if (imgElement) {
        const image = document.createElement('img');
        image.src = imgElement.src;
        image.alt = imgElement.alt || '';
        rows.push([image]);
    } else {
        const errorMessage = document.createElement('div');
        errorMessage.textContent = 'Image not available';
        rows.push([errorMessage]);
    }

    // Create the block table
    const block = WebImporter.DOMUtils.createTable(rows, document);

    // Replace the element with the new block table
    element.replaceWith(block);
}
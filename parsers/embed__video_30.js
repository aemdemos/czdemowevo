export default function parse(element, { document }) {
    // Extract information for video embedding
    const videoUrl = 'https://vimeo.com/454418448';

    // Create header row for the block
    const headerRow = [document.createElement('strong')];
    headerRow[0].textContent = 'Embed';

    // Create content row with the image and link
    const videoImage = document.createElement('img');
    videoImage.src = 'https://via.placeholder.com/450'; // Placeholder for video thumbnail
    const videoLink = document.createElement('a');
    videoLink.href = videoUrl;
    videoLink.textContent = videoUrl;

    const contentRow = [[videoImage, document.createElement('br'), videoLink]];

    // Use createTable to create the block
    const block = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

    // Replace the original element with the new block
    element.replaceWith(block);
}